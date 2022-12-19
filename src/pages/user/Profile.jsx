// Import library
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import components
import { useAuth } from "../../contexts";
import { findById } from "../../utils";
import { Loading } from "../../components";

const Profile = () => {
    // ? Get data in custom hook
    const { currentUser } = useAuth();

    // ? Set up states variables
    const [user, setUser] = useState();

    /**
     * ? Side effect
     * * 1. Get user
     */
    useEffect(() => {
        const getUser = async () => {
            // Get user data from API
            const qSnapshot = await findById("user", currentUser.uid);
            const data = { ...qSnapshot.data() };

            // Set data value in user state
            setUser(data);
        };

        getUser();
    }, [currentUser]);

    if (!user) {
        return <Loading />;
    }

    return (
        <div className="profile flow">
            <div className="section-heading">Hồ sơ người dùng</div>
            <div className="profile-form form flow">
                <div className="form-photo">
                    <img
                        className="form-preview"
                        src={user.photoURL}
                        alt={user.fullName}
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
                        placeholder="Họ tên"
                        className="form-input"
                        readOnly
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
                        placeholder="Tên hiển thị"
                        className="form-input"
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        placeholder="Email"
                        className="form-input"
                        readOnly
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
                        placeholder="Số điện thoại"
                        className="form-input"
                        readOnly
                    />
                </div>
                <div
                    className="d-flex justify-between items-center"
                    style={{ flexWrap: "wrap" }}
                >
                    <Link
                        to={`/profile/edit/${currentUser.uid}`}
                        className="button"
                        button-variant="contained"
                        button-color="primary"
                    >
                        Chỉnh sửa hồ sơ
                    </Link>
                    <Link
                        to={`/profile/purchase`}
                        className="button"
                        button-variant="outlined"
                        button-color="primary"
                    >
                        Lịch sử mua hàng
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
