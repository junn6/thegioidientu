// Import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import { AuthProvider } from "../contexts";
import AuthRoutes from "./AuthRoutes";
import PrivateRoutes from "./PrivateRoutes";
import {
    Login,
    Dashboard,
    User,
    AddUser,
    EditUser,
    Product,
    AddProduct,
    EditProduct,
    Order,
    PermissionDenied,
} from "../pages";
import { Wrapper } from "../components";

const ShopRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route element={<AuthRoutes />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/denied" element={<PermissionDenied />} />
                        <Route element={<Wrapper />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/user" element={<User />} />
                            <Route path="/user/create" element={<AddUser />} />
                            <Route
                                path="/user/edit/:userId"
                                element={<EditUser />}
                            />
                            <Route path="/product" element={<Product />} />
                            <Route
                                path="/product/create"
                                element={<AddProduct />}
                            />
                            <Route
                                path="/product/edit/:productId"
                                element={<EditProduct />}
                            />
                            <Route path="/order" element={<Order />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default ShopRoutes;
