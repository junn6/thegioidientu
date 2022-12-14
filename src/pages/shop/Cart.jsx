// Import library
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import components
import { useAuth } from "../../contexts";
import { useGetCollection } from "../../hooks";
import { update } from "../../utils";
import { Loading } from "../../components";
import emptyCard from "../../assets/illus/empty-cart.svg";

const Cart = () => {
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

    /**
     * ? Handle event function
     * * 1. Handle when click increase / decrease button
     * * 2. Handle when click remove button
     */
    const handleUpdate = async (event, { index, type }) => {
        event.target.parentNode.setAttribute("data-visible", false);
        const sku = cart.products[index].sku;

        // TODO Check and update quantity with type
        switch (type) {
            case "increase":
                sku.quantity += 1;
                break;
            case "decrease":
                if (sku.quantity === 1) {
                    event.target.parentNode.setAttribute("data-visible", true);
                    return;
                }
                sku.quantity -= 1;
                break;
            default:
                return;
        }

        // TODO Update total price of cart
        cart.total = cart.products.reduce(
            (prev, item) => prev + item.cost.value * item.sku.quantity,
            0
        );

        // TODO Update cart collection in firestore
        await update("cart", cart.id, {
            products: cart.products,
            total: cart.total,
        });

        // TODO Set cart state for render
        setCart({ ...cart });

        event.target.parentNode.setAttribute("data-visible", true);
    };

    const handleDelete = async (index) => {
        // TODO Get products in cart
        const products = cart.products;

        // TODO Remove product with index
        products.splice(index, 1);

        // TODO Update total price of cart
        cart.total =
            cart.products.length !== 0
                ? cart.products.reduce(
                      (prev, item) =>
                          prev + item.cost.value * item.sku.quantity,
                      0
                  )
                : 0;

        // TODO Update cart collection in firestore
        await update("cart", cart.id, {
            products,
            total: cart.total,
        });

        // TODO Set cart state for render
        setCart({ ...cart });
    };

    /**
     * ? Side effect
     * * 1. Set cart state
     */
    useEffect(() => {
        if (data) {
            setCart(data[0]);
        }
    }, [data]);

    if (loading || !cart) {
        return <Loading />;
    }

    return (
        <div className="cart h-full d-flex direction-column">
            <div className="d-flex justify-between items-center">
                <div className="section-heading">Gi??? h??ng</div>
                <p className="text-neutral-300 fw-medium">
                    {cart.products.length} m???t h??ng
                </p>
            </div>
            {/* Cart Items */}
            {cart.products.length ? (
                <div className="flex-grow-1 flow">
                    <div className="cart-list d-grid">
                        {cart.products.map((product, index) => (
                            <div
                                className="cart-item d-flex items-center"
                                key={product.id}
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    className="cart-item-img"
                                >
                                    <img
                                        className="img-fluid"
                                        src={product.photoURL}
                                        alt={product.name}
                                    />
                                </Link>
                                <div className="cart-item-info flex-grow-1">
                                    <div className="fs-400 text-neutral-500 text-truncate">
                                        <Link to={`/product/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </div>
                                    <p className="text-neutral-300">
                                        {product.sku.color}
                                    </p>
                                </div>
                                <div
                                    className="cart-item-quantity d-flex items-center text-neutral-500"
                                    data-visible={true}
                                >
                                    <span
                                        className="material-symbols-rounded"
                                        onClick={(e) =>
                                            handleUpdate(e, {
                                                index,
                                                type: "decrease",
                                            })
                                        }
                                    >
                                        remove
                                    </span>
                                    {product.sku.quantity}
                                    <span
                                        className="material-symbols-rounded"
                                        onClick={(e) =>
                                            handleUpdate(e, {
                                                index,
                                                type: "increase",
                                            })
                                        }
                                    >
                                        add
                                    </span>
                                </div>
                                <div className="cart-item-cost text-neutral-500 text-truncate">
                                    {`${
                                        product.cost.value *
                                        product.sku.quantity
                                    } VN??`}
                                </div>
                                <div className="cart-item-icon">
                                    <span
                                        className="material-symbols-rounded"
                                        onClick={() => handleDelete(index)}
                                    >
                                        delete
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex items-center">
                        <Link
                            to="/shop"
                            className="button"
                            button-variant="outlined"
                            button-color="primary"
                        >
                            ti???p t???c mua h??ng
                        </Link>
                        <Link
                            to="/order/checkout"
                            className="button"
                            button-variant="contained"
                            button-color="primary"
                        >
                            mua ngay
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex-grow-1 d-flex justify-center items-center">
                    <div
                        className="flow text-center"
                        style={{ "--flow-spacer": "1.5rem" }}
                    >
                        <p className="fw-medium">
                            B???n ch??a c?? m???t h??ng n??o trong gi??? h??ng c???a m??nh
                        </p>
                        <img
                            style={{
                                width: "min(100%, 16rem)",
                                height: "auto",
                                marginInline: "auto",
                            }}
                            src={emptyCard}
                            alt="Empty cart"
                        />
                        <Link
                            to="/shop"
                            className="button"
                            button-variant="contained"
                            button-color="primary"
                        >
                            ti???p t???c mua h??ng
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
