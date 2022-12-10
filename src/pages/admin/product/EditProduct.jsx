// Import library
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Import components
import { Loading } from "../../../components";
import { update, findById } from "../../../utils";

const EditProduct = () => {
    // ? Get user id in param with useParams hook
    const { productId } = useParams();

    // ? Set up states variables
    const [error, setError] = useState("");
    const [product, setProduct] = useState();

    // ? Navigate variable
    const navigate = useNavigate();

    // ? Set up user data in localstorage
    const productData = useMemo(() => {
        if (!product) {
            return "";
        }

        return JSON.parse(localStorage.getItem("product"));
    }, [product]);

    /**
     * ? Handle event function
     * * 1. Handle input change
     * * 2. Handle submit form
     */
    const handleChange = (e, index = null) => {
        const field = e.target.getAttribute("aria-label");

        if (!index) {
            if (field === "cost") {
                product[field] = {
                    value: parseFloat(e.target.value),
                    format: `${e.target.value} VNĐ`,
                };
            } else {
                product[field] = e.target.value;
            }
        }

        if (index && field === "skus") {
            product[field][index - 1][e.target.name] = e.target.value;
        }

        if (index && field === "details") {
            product[field][index - 1].content = e.target.value;
        }

        setProduct({ ...product });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation
         * * 1. Enter enough information
         * * 2. Check product data is changed?
         */
        // ? Enter enough information
        const isEnterDetails = product.details.every(
            (detail) => detail.content.length > 0
        );
        const isEnterSkus = product.skus.every(
            (sku) => sku.type.length > 0 && sku.quantity.length > 0
        );

        if (
            !product.name ||
            !product.desc ||
            !product.cost ||
            !isEnterDetails ||
            !isEnterSkus
        ) {
            setError("Bạn cần nhập đủ thông tin sản phẩm!");
            return;
        }

        // ? Check product data is changed?
        if (JSON.stringify(productData) === JSON.stringify(product)) {
            setError("Dữ liệu sản phẩm không thay đổi!");
            return;
        }

        // TODO Setup total skus of products
        product.total = product.skus.reduce((total, sku) => {
            return total + parseInt(sku.quantity);
        }, 0);

        // TODO Update data in firestore
        await update("product", productId, { ...product });

        // TODO navigate to product dashboard
        navigate("/product");
    };

    /**
     * ? Side effect
     * * 1. Get product info
     */
    useEffect(() => {
        // Get function
        getProductById(productId);

        return () => {
            localStorage.removeItem("product");
        };
    }, [productId]);

    if (!product) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    // ? Method for get user data
    async function getProductById(id) {
        // TODO Get data in firestore
        const productSnap = await findById("product", id);
        // TODO Set product data
        const productData = productSnap.data();
        localStorage.setItem("product", JSON.stringify({ ...productData }));
        setProduct({ ...productData });
    }

    return (
        <section className="flow">
            <h5>Chỉnh sửa thông tin sản phẩm</h5>
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
                {/* Hình ảnh */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Hình ảnh
                </div>
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                    {product.photos.map((photoUrl, index) => (
                        <div
                            key={index}
                            className="form--photos"
                            style={{ width: "10rem" }}
                        >
                            <img src={photoUrl} alt="product img" />
                        </div>
                    ))}
                </div>
                {/* Thông tin chung */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Thông tin chung
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="name"
                        aria-label="name"
                        value={product.name}
                        onChange={(e) => handleChange(e)}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="name">
                        Nhập tên:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="text"
                        id="desc"
                        aria-label="desc"
                        value={product.desc}
                        onChange={(e) => handleChange(e)}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="desc">
                        Nhập mô tả:
                    </label>
                </div>
                <div className="form--group">
                    <input
                        className="form--input"
                        type="number"
                        id="cost"
                        aria-label="cost"
                        value={product.cost.value}
                        onChange={(e) => handleChange(e)}
                        placeholder=" "
                    />
                    <label className="form--label" htmlFor="cost">
                        Nhập giá:
                    </label>
                </div>
                {/* Thông tin chi tiết sản phẩm */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Thông tin chi tiết sản phẩm
                </div>
                {product.details.map(({ name, label, content }, index) => (
                    <div className="form--group" key={index}>
                        <input
                            className="form--input"
                            type="text"
                            id={name}
                            aria-label="details"
                            value={content}
                            onChange={(e) => handleChange(e, index + 1)}
                            placeholder=" "
                        />
                        <label className="form--label" htmlFor={name}>
                            Nhập {label}:
                        </label>
                    </div>
                ))}
                {/* Thông tin hàng tồn */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Hàng tồn
                </div>
                {product.skus.map((sku, index) => (
                    <div className="d-flex" key={index}>
                        <div className="form--group" style={{ flex: 1 }}>
                            <input
                                className="form--input"
                                id={"type" + index}
                                name="type"
                                aria-label="skus"
                                value={sku.type}
                                onChange={(e) => handleChange(e, index + 1)}
                                placeholder=" "
                                type="text"
                            />
                            <label
                                className="form--label"
                                htmlFor={"type" + index}
                            >
                                Nhập loại:
                            </label>
                        </div>
                        <div className="form--group" style={{ flex: 1 }}>
                            <input
                                className="form--input"
                                id={"quantity" + index}
                                name="quantity"
                                value={sku.quantity}
                                aria-label="skus"
                                onChange={(e) => handleChange(e, index + 1)}
                                type="number"
                                placeholder=" "
                            />
                            <label
                                className="form--label"
                                htmlFor={"quantity" + index}
                            >
                                Nhập số lượng:
                            </label>
                        </div>
                    </div>
                ))}
                <button
                    className="button text--center"
                    button-variant="contained"
                    button-color="green"
                >
                    cập nhật
                </button>
            </form>
        </section>
    );
};

export default EditProduct;
