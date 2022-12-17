// Import library
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import components
import {
    findById,
    all,
    capitalizeFirstLetter,
    trimLetter,
} from "../../../utils";
import { Loading, ReviewInput, ReviewCard } from "../../../components";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";

const ProductDetail = () => {
    // ? Get product id in url
    const { productId } = useParams();

    // ? Set up states variables
    const [product, setProduct] = useState();
    const [review, setReview] = useState();
    const [error, setError] = useState("");
    const [skuId, setSkuId] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [tabItem, setTabItem] = useState("detail");

    /**
     * ? Handle event function
     * * 1. Handle when click sku type button
     * * 2. Handle when click add, remove button
     * * 3. Handle when click add to cart button
     * * 4. Handle when click buy now button
     */
    const handleSkuClick = (e, id) => {
        if (e.target.getAttribute("data-quantity") === "false") {
            return;
        }

        if (id === skuId - 1) {
            setSkuId(0);
            return;
        }

        setSkuId(id + 1);
    };

    const handleQuantity = (option) => {
        switch (option?.type) {
            case "increase":
                setQuantity((prev) => prev + 1);
                break;
            case "decrease":
                if (quantity === 1) {
                    return;
                }
                setQuantity((prev) => prev - 1);
                break;
            default:
                return;
        }
    };

    const handleAddtoCart = async () => {
        console.log("Add to cart");
    };

    const handleOrder = async () => {
        console.log("Order to Cart");
    };

    /**
     * ? Side effect
     * * 1. Get products
     */
    useEffect(() => {
        const getProduct = async () => {
            // TODO Get product info and review from API
            const snapshot = await findById("product", productId);
            const reviewData = [];
            const reviewSnapshots = await all("review", {
                field: "productId",
                condition: "==",
                data: productId,
            });
            reviewSnapshots.forEach((snap) => {
                reviewData.push({ id: snap.id, ...snap.data() });
            });
            // TODO Set value in product state
            setProduct({ id: snapshot.id, ...snapshot.data() });
            setReview({ ...reviewData[0] });
        };

        getProduct();
    }, [productId]);

    if (!product || !review) {
        return <Loading />;
    }

    return (
        <div className="product flow">
            {/* Product info */}
            <div className="product-info d-flex">
                <div className="product-info-img">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={product.photos.length > 1}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {product.photos.map((photo, index) => (
                            <SwiperSlide key={index}>
                                <img src={photo} alt={product.name} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div
                    className="product-info-content flow"
                    style={{ "--flow-spacer": "1rem" }}
                >
                    <div className="product-info-name ff-secondary fs-500 fw-medium">
                        {product.name}
                    </div>
                    <div className="product-info-cost ff-secondary fs-400 fw-medium">
                        {product.cost.format}
                    </div>
                    <p className="product-info-desc text-neutral-400">
                        {product.description}
                    </p>
                    <div
                        className="product-info-skus d-flex"
                        style={{ flexWrap: "wrap" }}
                    >
                        {product.skus.map((sku, id) => (
                            <div
                                key={sku.type}
                                className="product-info-sku"
                                data-visible={id === skuId - 1}
                                data-quantity={sku.quantity !== 0}
                                onClick={(e) => handleSkuClick(e, id)}
                            >
                                {sku.type}
                            </div>
                        ))}
                    </div>
                    <div
                        className="d-flex items-center"
                        style={{ gap: "0.5rem" }}
                    >
                        <div className="product-info-amount d-flex items-center">
                            <span
                                className="material-symbols-rounded"
                                onClick={() =>
                                    handleQuantity({ type: "decrease" })
                                }
                            >
                                remove
                            </span>
                            <input
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number"
                            />
                            <span
                                className="material-symbols-rounded"
                                onClick={() =>
                                    handleQuantity({ type: "increase" })
                                }
                            >
                                add
                            </span>
                        </div>
                        <p className="text-neutral-300 fs-200">
                            {!skuId
                                ? product.total
                                : product.skus[skuId - 1].quantity}{" "}
                            sản phẩm có sẵn
                        </p>
                    </div>
                    <div>
                        {error && (
                            <p
                                className="fs-200 fw-semibold"
                                style={{
                                    color: "#ff3333",
                                }}
                            >
                                {error}
                            </p>
                        )}
                    </div>
                    <div
                        className="product-info-action d-flex"
                        style={{ flexWrap: "wrap" }}
                    >
                        <button
                            style={{ "--gap": "0.25rem" }}
                            className="button d-inline-flex items-center fs-200"
                            button-variant="outlined"
                            button-color="primary"
                            onClick={handleAddtoCart}
                        >
                            <span className="material-symbols-rounded">
                                add_shopping_cart
                            </span>
                            thêm vào giỏ hàng
                        </button>
                        <button
                            className="button fs-200"
                            button-variant="contained"
                            button-color="primary"
                            onClick={handleOrder}
                        >
                            mua ngay
                        </button>
                    </div>
                </div>
            </div>
            {/* Product tab */}
            <div className="product-tab">
                <div className="product-tab-list d-flex justify-center items-center">
                    <div
                        className="product-tab-item text-capitalize"
                        data-tab="detail"
                        data-active={tabItem === "detail"}
                        onClick={(e) =>
                            setTabItem(e.target.getAttribute("data-tab"))
                        }
                    >
                        chi tiết
                    </div>
                    <div
                        className="product-tab-item text-capitalize"
                        data-tab="review"
                        data-active={tabItem === "review"}
                        onClick={(e) =>
                            setTabItem(e.target.getAttribute("data-tab"))
                        }
                    >
                        đánh giá
                    </div>
                </div>
                <div className="product-tab-content">
                    {tabItem === "detail" && (
                        <div className="product-detail">
                            <div
                                className="ff-secondary fs-400 fw-semibold"
                                style={{ marginBottom: "0.5rem" }}
                            >
                                Chi tiết sản phẩm
                            </div>
                            {product.details.map((detail) => (
                                <p
                                    key={detail.name}
                                    className="product-detail-item d-flex"
                                >
                                    <span
                                        style={{
                                            width: "12rem",
                                            flexShrink: "0",
                                        }}
                                        className="fw-semibold"
                                    >
                                        {`${capitalizeFirstLetter(
                                            detail.label
                                        )}`}
                                    </span>
                                    <span className="fw-medium">
                                        {trimLetter(detail.content)}
                                    </span>
                                </p>
                            ))}
                        </div>
                    )}
                    {tabItem === "review" && (
                        <div className="product-review flow">
                            <div className="d-flex justify-between items-center">
                                <div className="ff-secondary fs-400 fw-semibold">
                                    Đánh giá sản phẩm
                                </div>
                                <p className="product-review-total">
                                    {review.comment.length} đánh giá
                                </p>
                            </div>
                            <ReviewInput
                                reviewId={review.id}
                                product={product}
                            />
                            <div className="ff-secondary fs-400 fw-semibold">
                                Nội dung đánh giá
                            </div>
                            {review.comment.length === 0 && (
                                <p
                                    style={{
                                        "--gap": "1.25rem",
                                        width: "100%",
                                        padding: "1rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #e0e0e0",
                                    }}
                                    className="d-flex fw-semibold"
                                >
                                    <span className="material-symbols-rounded">
                                        stars
                                    </span>
                                    <span>
                                        Hãy đánh giá sản phẩm để giúp những
                                        khách hàng khác có thể chọn được sản
                                        phẩm tốt nhất!
                                    </span>
                                </p>
                            )}
                            {review.comment.length === 0 && (
                                <div className="product-review-list">
                                    {review.comment.map((item) => (
                                        <ReviewCard
                                            key={item.name}
                                            data={item}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
