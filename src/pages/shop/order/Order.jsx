// Import library
import { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

// Import components
import { useAuth } from "../../../contexts";
import { useGetCollection } from "../../../hooks";
import { update } from "../../../utils";
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

    /**
     * ? Handle event function
     * * 1. Handle submit
     */
    const handleSubmit = () => {
        console.log("Submit");
        return;
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
        <div className="order flow">
            <div className="section-heading">Thủ tục thanh toán</div>
            <form className="order-form form d-flex direction-column">
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    fundingSource="paypal"
                    onClick={handleSubmit}
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
                        return actions.order.capture().then(function (details) {
                            console.log(
                                "Transaction completed by",
                                details.payer.name.given_name
                            );
                            // TODO Save info order to order document in firestore
                        });
                    }}
                />
            </form>
        </div>
    );
};

export default Order;
