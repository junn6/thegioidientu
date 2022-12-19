// Import library
import { Link } from "react-router-dom";

// Import components
import SuccessfulPurchase from "../../../assets/illus/successful_purchase.svg";

const OrderSuccess = () => {
    return (
        <div className="w-full h-full d-flex justify-center items-center">
            <div className="text-center flow">
                <img
                    style={{
                        width: "min(100%, 15rem)",
                        aspectRatio: 1,
                        objectFit: "cover",
                        marginInline: "auto",
                    }}
                    src={SuccessfulPurchase}
                    alt="Your order is confirmed!"
                />
                <p className="fs-400 fw-semibold">
                    Đơn hàng của bạn đã được xác nhận
                </p>
                <p>Cảm ơn vì bạn đã tin tưởng và đặt hàng tại cửa hàng</p>
                <Link
                    to="/shop"
                    className="button"
                    button-variant="contained"
                    button-color="primary"
                >
                    Tiếp tục mua hàng
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
