// Import library
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";
import { PayPalButtons } from "@paypal/react-paypal-js";

// Import components
import { useAuth } from "../../../contexts";
import { useGetCollection } from "../../../hooks";
import { all, findById, create, update, dateFormat } from "../../../utils";
import { Loading } from "../../../components";

const Order = () => {
    // ? Get data in custom hook
    const { currentUser } = useAuth();
    const [loading, data] = useGetCollection({
        collectionName: "cart",
        collectionCondition: {
            field: "uid",
            condition: "==",
            data: currentUser.uid,
        },
    });

    // ? Set up states variables
    const [cart, setCart] = useState();
    const [user, setUser] = useState();
    const [isEnable, setIsEnalbe] = useState("false");

    // ? Set up ref variables
    const fullNameRef = useRef();
    const phoneNumberRef = useRef();
    const addressRef = useRef();

    // ? Navigate variable
    const navigate = useNavigate();

    /**
     * ? Function
     * * 1. Update skus quantity for list product of order to product document in firestore
     * * 2. Save order info to firestore
     */
    const updateProduct = async (item) => {
        // TODO Get product data in firestore
        const snapshot = await findById("product", item.id);
        const { skus } = snapshot.data();

        // TODO Update product sku quantity in firestore
        const skuOrder = skus.find((sku) => sku.type === item.sku.type);
        skuOrder.quantity = `${
            parseInt(skuOrder.quantity) - item.sku.quantity
        }`;
        const total = skus.reduce(
            (prev, item) => prev + parseInt(item.quantity),
            0
        );

        await update("product", item.id, {
            skus: [...skus],
            total,
        });

        // TODO Update revenue product in firestore
        const revenueSnapshot = await all("revenue", {
            field: "productId",
            condition: "==",
            data: item.id,
        });
        const revenueRs = [];
        revenueSnapshot.forEach((doc) => {
            // TODO Format and push data in data array
            revenueRs.push({ id: doc.id, ...doc.data() });
        });
        const revenue = revenueRs[0];
        await update("revenue", revenue.id, {
            quantity: revenue.quantity + item.sku.quantity,
        });
    };

    const saveOrderInfo = async () => {
        // TODO Update skus for all product in cart
        await Promise.all(
            cart.products.map((product) => updateProduct(product))
        );

        // TODO Create and save order data in firestore
        const total = cart.products.reduce(
            (prev, curr) => prev + curr.sku.quantity * curr.cost.value,
            0
        );

        await create("order", {
            uid: currentUser.uid,
            fullName: fullNameRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            address: addressRef.current.value,
            products: [...cart.products],
            total,
            createdAt: {
                timestamp: serverTimestamp(),
                format: dateFormat(Date.now()),
            },
            status: 0,
        });

        // TODO Update cart data
        await update("cart", cart.id, {
            products: [],
            total: 0,
        });

        // TODO Navigate to order success page
        navigate("/order/success");
    };

    /**
     * ? Handle event
     * * 1. handle when input change value
     */
    const handleChange = (event, { field }) => {
        // TODO Set data in user data
        console.log(field);
        setUser((prev) => ({ ...prev, [field]: event.target.value }));

        // TODO If insufficient data are available
        if (
            !fullNameRef.current.value ||
            !phoneNumberRef.current.value ||
            !addressRef.current.value
        ) {
            // TODO Unenabled button checkout
            setIsEnalbe("false");
        } else {
            // TODO Enabled button checkout
            setIsEnalbe("true");
        }
    };

    /**
     * ? Side effect
     * * 1. Set cart state
     * * 2. Set user state
     */
    useEffect(() => {
        if (data) {
            setCart(data[0]);
        }
    }, [data]);

    useEffect(() => {
        const getData = async () => {
            // Get user data from API
            const qSnapshot = await findById("user", currentUser.uid);
            const data = { ...qSnapshot.data() };

            // Set data value in user state
            setUser({ id: currentUser.uid, ...data, address: "" });
        };

        getData();
    }, [currentUser]);

    if (loading || !cart || !user) {
        return <Loading />;
    }

    return (
        <div className="order flow">
            <div className="section-heading">Thủ tục thanh toán</div>
            <div className="order-form form d-flex direction-column">
                {/* List order product */}

                <div className="fs-400 ff-secondary fw-semibold">
                    Danh sách sản phẩm
                </div>
                {cart.products.map((product, index) => (
                    <div className="d-flex items-center" key={index}>
                        <img
                            style={{
                                width: "5rem",
                                aspectRatio: "1",
                                objectFit: "cover",
                            }}
                            src={product.photoURL}
                            alt={product.name}
                        />
                        <div className="flex-grow-1">
                            <div className="text-truncate">{product.name}</div>
                            <p className="fs-200 text-neutral-300">
                                Số lượng: {product.sku.quantity}
                            </p>
                        </div>
                        <p className="fs-200">{product.cost.format}</p>
                    </div>
                ))}
                <div className="d-flex justify-between items-center">
                    <div className="fw-medium">Tổng thanh toán: </div>
                    <p className="fs-200">
                        {`${cart.products.reduce(
                            (prev, curr) =>
                                prev + curr.sku.quantity * curr.cost.value,
                            0
                        )} VNĐ`}
                    </p>
                </div>
                {/* Shipping info */}
                <div className="fs-400 ff-secondary fw-semibold">
                    Thông tin đặt hàng
                </div>
                <div className="form-group w-full">
                    <label className="form-label" htmlFor="displayName">
                        Họ và tên:
                    </label>
                    <input
                        type="text"
                        placeholder=" "
                        className="form-input"
                        ref={fullNameRef}
                        value={user.fullName}
                        onChange={(e) => handleChange(e, { field: "fullName" })}
                    />
                </div>
                <div className="form-group w-full">
                    <label className="form-label" htmlFor="displayName">
                        Số điện thoại:
                    </label>
                    <input
                        type="text"
                        placeholder=" "
                        className="form-input"
                        ref={phoneNumberRef}
                        value={user.phoneNumber}
                        onChange={(e) =>
                            handleChange(e, { field: "phoneNumber" })
                        }
                    />
                </div>
                <div className="form-group w-full">
                    <label className="form-label" htmlFor="displayName">
                        Nơi nhận hàng:
                    </label>
                    <input
                        type="text"
                        placeholder=" "
                        className="form-input"
                        ref={addressRef}
                        value={user.address}
                        onChange={(e) => handleChange(e, { field: "address" })}
                    />
                </div>
                {/* Payments */}
                <div className="fs-400 ff-secondary fw-semibold">
                    Hình thức thanh toán
                </div>
                {/* Order Button */}
                <div className="order-button" data-visible={isEnable}>
                    <PayPalButtons
                        fundingSource="paypal"
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: `${(
                                                cart.products.reduce(
                                                    (prev, curr) =>
                                                        prev +
                                                        curr.sku.quantity *
                                                            curr.cost.value,
                                                    0
                                                ) * 0.0000402455
                                            ).toFixed(2)}`,
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order
                                .capture()
                                .then(function (details) {
                                    console.log(
                                        "Transaction completed by",
                                        details.payer.name.given_name
                                    );
                                    // TODO Save info order to order document in firestore
                                    saveOrderInfo();
                                });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Order;
