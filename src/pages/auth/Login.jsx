// Import library
import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Import components
import { useAuth } from "../../contexts";

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

        // Validation
        if (!emailRef.current.value || !passwordRef.current.value) {
            setError("Bạn cần nhập đủ thông tin!");
            return;
        }

        // Sign in
        try {
            await signin(emailRef.current.value, passwordRef.current.value);
        } catch (error) {
            console.log(error);
            setError("Lỗi đăng nhập. Vui lòng thực hiện lại!");
            return;
        }

        // Navigate to homepage
        navigate("/");
    };

    return (
        <form className="form flow" onSubmit={handleSubmit}>
            <div className="form-heading text-center">Đăng nhập!</div>
            <div className="form-group">
                <input
                    type="email"
                    ref={emailRef}
                    placeholder="Nhập email"
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    ref={passwordRef}
                    placeholder="Nhập mật khẩu"
                    className="form-input"
                />
            </div>
            <div>
                {error && (
                    <p
                        className="fs-200 fw-semibold"
                        style={{
                            color: "#ff3333",
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>
            <button
                className="button w-full text-center"
                button-variant="contained"
                button-color="primary"
            >
                Đăng nhập
            </button>
            <div className="text-center text-neutral-300 fw-medium fs-200">
                Bạn chưa có tài khoản?{" "}
                <Link className="form-link" to="/signup">
                    Đăng ký
                </Link>
            </div>
        </form>
    );
};

export default Login;
