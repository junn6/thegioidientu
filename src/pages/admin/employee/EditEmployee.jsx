// Import library
import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import icons
import { MdAddPhotoAlternate } from "react-icons/md";
import { v4 } from "uuid";

// Import components
import { Loading } from "../../../components";
import {
    update,
    uploadAndGetPhotoURL,
    findById,
    phoneNumberRegex,
} from "../../../utils";

const EditEmployee = () => {
    // ? Get user id in param with useParams hook
    const { employeeId } = useParams();

    // ? Set up ref variables
    const photoRef = useRef();
    const buttonRef = useRef();

    // ? Set up states variables
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState();
    const [user, setUser] = useState();

    // ? Navigate variable
    const navigate = useNavigate();

    // ? Set up user data in localstorage
    const userData = useMemo(() => {
        if (!user) {
            return "";
        }

        return JSON.parse(localStorage.getItem("user"));
    }, [user]);

    /**
     * ? Handle event function
     * * 1. Open file when click photo upload button
     * * 2. Handle when file ref change
     * * 3. Handle input change
     * * 4. Handle submit form
     */
    function handleClicktoOpenFile() {
        photoRef.current.click();
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
        }
    }

    const handleChange = (e) => {
        const field = e.target.id;
        setUser((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation
         * * 1. Enter enough information
         * * 2. Field data is valid
         */
        // ? Enter enough information
        if (!user.fullName || !user.displayName || !user.phoneNumber) {
            setError("Bạn cần nhập đủ thông tin tài khoản!");
            return;
        }

        // ? Field data is valid
        if (!phoneNumberRegex.test(user.phoneNumber)) {
            setError("Số điện thoại không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        // TODO Upload image when user update photo
        if (avatar) {
            // * Upload and get url
            const path = `avatar/${user.displayName}/${
                user.displayName + v4()
            }`;
            const url = await uploadAndGetPhotoURL(path, avatar);
            // * update photo url in data user object
            user.photoURL = url;
        }

        // TODO Check data is change
        if (JSON.stringify(userData) === JSON.stringify(user)) {
            setError("Dữ liệu người dùng không thay đổi!");
            return;
        }

        // TODO Update data in firestore
        await update("user", employeeId, { ...user });

        // TODO navigate to employee dashboard
        navigate("/employee");
    };

    /**
     * ? Side effect
     * * 1. Get user info
     * * 2. Remove preview photo when component unmount
     */
    useEffect(() => {
        // Get function
        getUserById(employeeId);

        return () => {
            localStorage.removeItem("user");
        };
    }, [employeeId]);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // ? Method for get user data
    async function getUserById(id) {
        // TODO Get data in firestore
        const userSnap = await findById("user", id);
        // TODO Set user data
        const userData = userSnap.data();
        localStorage.setItem("user", JSON.stringify({ ...userData }));
        setUser({ ...userData });
    }

    if (!user) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <h5>Chỉnh sửa hồ sơ khách hàng</h5>
            <form className="form form--manage" onSubmit={handleSubmit}>
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
                <div className="form--preview" onClick={handleClicktoOpenFile}>
                    <img
                        src={avatar ? avatar.preview : user.photoURL}
                        alt="sad"
                    />
                    <MdAddPhotoAlternate className="form--icon" />
                    <input
                        type="file"
                        id="file"
                        ref={photoRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="fullName">
                        Họ tên:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="displayName"
                        value={user.displayName}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="displayName">
                        Tên người dùng:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="email"
                        id="email"
                        value={user.email}
                        disabled={true}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="email">
                        Email:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="phoneNumber">
                        Số điện thoại:
                    </label>
                </div>
                <button
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                    ref={buttonRef}
                >
                    cập nhật
                </button>
            </form>
        </section>
    );
};

export default EditEmployee;
