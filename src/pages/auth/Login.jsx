// Import library
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import { useAuth } from "../../contexts";
import { findById } from "../../utils";

const Login = () => {
    // ? Get signin method in useAuth hook
    const { signin } = useAuth();

    // ? Set up states variables
    const [error, setError] = useState("");

    // ? Set up ref variables
    const emailRef = useRef();
    const passwordRef = useRef();

    // ? Navigate variable
    const navigate = useNavigate();

    /**
     * ? Handle event function
     * * 1. Sign in method
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO Validation
        if (!emailRef.current.value || !passwordRef.current.value) {
            setError("Bạn chưa nhập đủ thông tin. Vui lòng thực hiện lại!");
            return;
        }

        // TODO Sign in with firebase auth
        try {
            const auth = await signin(
                emailRef.current.value,
                passwordRef.current.value
            );
            // TODO Get data user in collection & Check role
            const { uid } = auth.user;
            const userSnap = await findById("user", uid);
            const { role } = userSnap.data();

            // * If not admin, navigate to denied pages
            if (role > 1) {
                navigate("/denied");
                return;
            }

            // * If admin, navigate to dashboard
            navigate("/");
        } catch {
            setError(
                "Bạn nhập sai email hoặc mật khẩu. Vui lòng thực hiện lại!"
            );
            return;
        }
    };

    return (
        <div className="signin w-screen h-screen d-flex justify--center items--center">
            <div className="signin--container flow">
                <h4 className="text--center text--capitalize">Đăng nhập</h4>
                <form className="form flow" onSubmit={handleSubmit}>
                    {error && (
                        <p
                            className="text--center"
                            style={{
                                color: "#ff3333",
                                fontWeight: 500,
                            }}
                        >
                            {error}
                        </p>
                    )}
                    <div className="form--group">
                        <input
                            className="form--input"
                            type="email"
                            id="email"
                            ref={emailRef}
                            placeholder=" "
                        />
                        <label className="form--label" htmlFor="email">
                            Nhập email:
                        </label>
                    </div>
                    <div className="form--group">
                        <input
                            className="form--input"
                            type="password"
                            id="password"
                            ref={passwordRef}
                            placeholder=" "
                        />
                        <label className="form--label" htmlFor="password">
                            Nhập password:
                        </label>
                    </div>
                    <button
                        className="button w-full text--center"
                        button-variant="contained"
                        button-color="primary"
                    >
                        đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
