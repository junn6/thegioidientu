// Import library
import { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

// Import components
import { useAuth } from "../../contexts";
import { findById, uploadAndGetPhotoURL, update } from "../../utils";
import { Loading } from "../../components";
import { phoneNumberRegex } from "../../constants";

const EditProfile = () => {
    // ? Get user id with useAuth hook
    const { currentUser } = useAuth();

    // ? Set up ref variables
    const photoRef = useRef();

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

    // ? Method for get user data
    async function getUserById(id) {
        // TODO Get data in firestore
        const userSnap = await findById("user", id);
        // TODO Set user data
        const userData = userSnap.data();
        localStorage.setItem("user", JSON.stringify({ ...userData }));
        setUser({ ...userData });
    }

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
        await update("user", currentUser.uid, { ...user });

        // TODO navigate to employee dashboard
        navigate("/profile");
    };

    /**
     * ? Side effect
     * * 1. Get user info
     * * 2. Remove preview photo when component unmount
     */
    useEffect(() => {
        // Get function
        const { uid } = currentUser;
        getUserById(uid);

        return () => {
            localStorage.removeItem("user");
        };
    }, [currentUser]);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    if (!user) {
        return <Loading />;
    }

    return (
        <div className="profile flow">
            <div className="section-heading">Cập nhật hồ sơ người dùng</div>
            <form className="profile-form form flow" onSubmit={handleSubmit}>
                {error && (
                    <p
                        className="fs-200 fw-semibold text-center"
                        style={{
                            color: "#ff3333",
                        }}
                    >
                        {error}
                    </p>
                )}
                <div className="form-photo">
                    <img
                        className="form-preview"
                        src={avatar ? avatar.preview : user.photoURL}
                        alt={user.fullName}
                    />
                    <div
                        className="form-photo-icon"
                        onClick={handleClicktoOpenFile}
                    >
                        <span className="material-symbols-rounded">
                            add_photo_alternate
                        </span>
                    </div>
                    <input
                        type="file"
                        id="file"
                        ref={photoRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                        Họ tên
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={user.fullName}
                        onChange={(e) => handleChange(e)}
                        placeholder="Họ tên"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="displayName">
                        Tên hiển thị
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={user.displayName}
                        onChange={(e) => handleChange(e)}
                        placeholder="Tên hiển thị"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        style={{ opacity: "0.6" }}
                        type="email"
                        id="email"
                        value={user.email}
                        onChange={(e) => handleChange(e)}
                        readOnly
                        placeholder="Email"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phoneNumber">
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={user.phoneNumber}
                        onChange={(e) => handleChange(e)}
                        placeholder="Số điện thoại"
                        className="form-input"
                    />
                </div>
                <button
                    className="button form-button w-full text-center"
                    button-variant="contained"
                    button-color="primary"
                >
                    cập nhật
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
