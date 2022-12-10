// Import library
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { MdAddPhotoAlternate } from "react-icons/md";

// Import components
import { useAuth } from "../../../contexts";
import {
    create,
    uploadAndGetPhotoURL,
    emailRegex,
    passwordRegex,
    phoneNumberRegex,
    dateFormat,
} from "../../../utils";
import { user as userObj } from "../../../constants";
import avatarDefault from "../../../assets/avatar/userprofile.jpg";

const AddEmployee = () => {
    // ? Get signin method in useAuth hook
    const { signup } = useAuth();

    // ? Set up ref variables
    const fullNameRef = useRef();
    const displayNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const passwordRef = useRef();
    const repasswordRef = useRef();
    const photoRef = useRef();

    // ? Set up states variables
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState();

    // ? Navigate variable
    const navigate = useNavigate();

    /**
     * ? Handle event function
     * * 1. Open file when click photo upload button
     * * 2. Handle when file ref change
     * * 3. Handle submit form
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation
         * * 1. Enter enough information
         * * 2. Field data is valid
         */
        // ? Enter enough information
        if (
            !fullNameRef.current.value ||
            !displayNameRef.current.value ||
            !emailRef.current.value ||
            !phoneNumberRef.current.value ||
            !passwordRef.current.value ||
            !repasswordRef.current.value
        ) {
            setError("Bạn cần nhập đủ thông tin tài khoản!");
            return;
        }

        // ? Field data is valid
        if (!emailRegex.test(emailRef.current.value)) {
            setError("Email không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        if (!passwordRegex.test(passwordRef.current.value)) {
            setError("Mật khẩu không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        if (passwordRef.current.value !== repasswordRef.current.value) {
            setError("Mật khẩu không khớp. Vui lòng nhập lại!");
            return;
        }

        if (!phoneNumberRegex.test(phoneNumberRef.current.value)) {
            setError("Số điện thoại không hợp lệ. Bạn cần nhập lại!");
            return;
        }

        /**
         * TODO Update data and upload file to firestore
         */
        // ? Create and update data user object
        const user = { ...userObj };
        user.fullName = fullNameRef.current.value;
        user.displayName = displayNameRef.current.value;
        user.email = emailRef.current.value;
        user.phoneNumber = phoneNumberRef.current.value;
        user.createdAt = {
            timestamp: serverTimestamp(),
            format: dateFormat(Date.now()),
        };
        user.role = 1;

        // ? Upload image to storage and get url image if have user avatar
        if (avatar) {
            // * Upload and get url
            const path = `avatar/${displayNameRef.current.value}/${
                displayNameRef.current.value + v4()
            }`;
            const url = await uploadAndGetPhotoURL(path, avatar);
            // * update photo url in data user object
            user.photoURL = url;
        }

        /**
         * TODO Subcribed account to firebase auth
         * * 1. sign up account
         * * 2. save data user in user collection firestore
         */
        try {
            // * 1. sign up account
            const res = await signup(
                emailRef.current.value,
                passwordRef.current.value
            );

            // * 2. save data user in users collection firestore
            await create("user", { ...user }, res.user.uid);

            // TODO navigate to employee dashboard
            navigate("/employee");
        } catch {
            setError("Lỗi tạo tài khoản. Vui lòng thử lại!");
            return;
        }
    };

    // ? Side effect
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    return (
        <section className="flow">
            <h5>Thêm mới khách hàng</h5>
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
                        src={avatar ? avatar.preview : avatarDefault}
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
                        ref={fullNameRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="fullName">
                        Nhập họ tên:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="displayName"
                        ref={displayNameRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="displayName">
                        Nhập tên người dùng:
                    </label>
                </div>
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
                <div className="form--group">
                    <input
                        className="form--input"
                        type="password"
                        id="repassword"
                        ref={repasswordRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="repassword">
                        Nhập lại password:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="phoneNumber"
                        ref={phoneNumberRef}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="phoneNumber">
                        Nhập số điện thoại:
                    </label>
                </div>
                <button
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                >
                    tạo mới
                </button>
            </form>
        </section>
    );
};

export default AddEmployee;
