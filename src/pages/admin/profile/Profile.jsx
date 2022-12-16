// Import library
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import components
import { useAuth } from "../../../contexts";
import { findById } from "../../../utils";
import { Loading } from "../../../components";

const Profile = () => {
    // ? Get user id with useAuth hook
    const { currentUser } = useAuth();

    // ? Set up states variables
    const [user, setUser] = useState();

    // ? Method for get user data
    async function getUserById(id) {
        // TODO Get data in firestore
        const userSnap = await findById("member", id);
        // TODO Set user data
        const userData = userSnap.data();
        setUser({ ...userData });
    }

    /**
     * ? Side effect
     * * 1. Get user info
     */
    useEffect(() => {
        // Get function
        const { uid } = currentUser;
        getUserById(uid);

        return () => {
            localStorage.removeItem("user");
        };
    }, [currentUser]);

    if (!user) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    return (
        <section className="flow">
            <h5>Hồ sơ cá nhân</h5>
            <div className="form form--manage">
                <div className="form--preview">
                    <img src={user.photoURL} alt="sad" />
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="fullName"
                        value={user.fullName}
                        placeholder=" "
                        readOnly={true}
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
                        placeholder=" "
                        readOnly={true}
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
                        placeholder=" "
                        readOnly={true}
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
                        placeholder=" "
                        readOnly={true}
                    />
                    <label className="form--label" htmlFor="phoneNumber">
                        Số điện thoại:
                    </label>
                </div>
                <Link
                    to="/profile/edit"
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                >
                    chỉnh sửa
                </Link>
            </div>
        </section>
    );
};

export default Profile;
