// Import library
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Import components
import { AuthProvider } from "../contexts";
import AuthRoutes from "./AuthRoutes";
import PrivateRoutes from "./PrivateRoutes";
import { Wrapper } from "../components";
import {
    Welcome,
    Login,
    Signup,
    Home,
    Shop,
    Cart,
    Profile,
    EditProfile,
    ProductCategory,
    ProductDetail,
    Order,
    OrderSuccess,
} from "../pages";

const ShopRoutes = () => {
    return (
        <AuthProvider>
            <PayPalScriptProvider
                options={{
                    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                }}
            >
                <Router>
                    <Routes>
                        <Route element={<AuthRoutes />}>
                            <Route path="/welcome" element={<Welcome />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </Route>
                        <Route element={<PrivateRoutes />}>
                            <Route element={<Wrapper />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/shop" element={<Shop />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route
                                    path="/profile/edit/:userId"
                                    element={<EditProfile />}
                                />
                                <Route
                                    path="/category/:slug"
                                    element={<ProductCategory />}
                                />
                                <Route
                                    path="/product/:productId"
                                    element={<ProductDetail />}
                                />
                                <Route
                                    path="/order/checkout"
                                    element={<Order />}
                                />
                                <Route
                                    path="/order/success"
                                    element={<OrderSuccess />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </PayPalScriptProvider>
        </AuthProvider>
    );
};

export default ShopRoutes;
