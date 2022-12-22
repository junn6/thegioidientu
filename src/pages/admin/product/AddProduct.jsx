// Import library
import { useEffect, useRef, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

// Import icon
import { AiFillPlusSquare } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

// Import components
import {
    product as productObj,
    review as reviewObj,
    revenue as revenueObj,
    productDetails,
} from "../../../constants";
import { dateFormat, uploadAndGetPhotoURL, create } from "../../../utils";

const AddProduct = () => {
    // ? Set up ref variables
    const nameRef = useRef();
    const descRef = useRef();
    const costRef = useRef();
    const photoRef = useRef();

    // ? Set up states variables
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [type, setType] = useState("điện thoại");
    const [details, setDetails] = useState();
    const [skus, setSkus] = useState([
        {
            type: "",
            quantity: 0,
        },
    ]);

    // ? Navigate variable
    const navigate = useNavigate();

    /**
     * ? Handle event function
     * * 1. Open file when click photo upload button
     * * 2. Handle when file ref change
     * * 3. Handle when click del icon image
     * * 4. Handle change type product when click product type button
     * * 5. Handle when detail data product field change
     * * 6. Handle when sku data change
     * * 7. Handle when click create sku button
     * * 8. Upload all files
     * * 9. Handle submit form
     */
    function handleClicktoOpenFile() {
        photoRef.current.click();
    }

    function handleFileChange(e) {
        // TODO Get and check valid file
        const file = e.target.files[0];
        if (file) {
            // TODO Update images array for preview
            setImages([...images, file]);
        }
    }

    function handleDelImage(file) {
        // TODO Remove data image blob
        URL.revokeObjectURL(file.preview);
        // TODO Update images array
        const imagesFilter = images.filter((image) => image !== file);
        setImages(imagesFilter);
    }

    function handleChangeType(productType) {
        if (productType === type) {
            return;
        }

        setType(productType);
    }

    function handleDetailChange(e, index) {
        // TODO Update data detail
        details[index].content = e.target.value;
        setDetails([...details]);
    }

    const handleSkus = (e, index) => {
        // TODO Update data sku
        skus[index][e.target.name] = e.target.value;
        setSkus([...skus]);
    };

    const handleCreateSku = () => {
        // TODO create and update to skus state
        const sku = {
            type: "",
            quantity: 0,
        };

        setSkus([...skus, sku]);
    };

    async function getAllUrls() {
        const urls = await Promise.all(
            [...images].map((image) => {
                const path = `product/${nameRef.current.value}/${
                    nameRef.current.value + v4()
                }`;

                return uploadAndGetPhotoURL(path, image);
            })
        );
        return urls;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        /**
         * TODO Validation
         * * 1. Enter enough information
         */
        // ? Enter enough information
        if (!images.length) {
            setError("Bạn cần thêm hình ảnh sản phẩm");
            return;
        }

        const isEnterDetails = details.every(
            (detail) => detail.content.length > 0
        );
        const isEnterSkus = skus.every(
            (sku) => sku.type.length > 0 && sku.quantity.length > 0
        );

        if (
            !nameRef.current.value ||
            !descRef.current.value ||
            !costRef.current.value ||
            !isEnterDetails ||
            !isEnterSkus
        ) {
            setError("Bạn cần nhập đủ thông tin sản phẩm");
            return;
        }

        /**
         * TODO Update data and upload file to firestore
         */
        // ? Create and update data product object
        const product = { ...productObj };
        product.name = nameRef.current.value;
        product.desc = descRef.current.value;
        product.category = productDetails[type].category;
        product.type = productDetails[type].type;
        product.cost = {
            value: parseFloat(costRef.current.value),
            format: `${costRef.current.value} VNĐ`,
        };
        product.details = [...details];
        product.createdAt = {
            timestamp: serverTimestamp(),
            format: dateFormat(Date.now()),
        };
        product.skus = [...skus];
        product.total = product.skus.reduce((total, sku) => {
            return total + parseInt(sku.quantity);
        }, 0);
        product.slug = productDetails[type].slug;
        product.photos = await getAllUrls();

        // * 1. Create product collection in firestore
        const res = await create("product", { ...product });

        const { id } = res;

        // * 2. Create review collection in firestore
        const review = { ...reviewObj };
        review.productId = id;
        review.name = product.name;
        review.photoURL = product.photos[0];
        review.total = 0;

        await create("review", { ...review });

        // * 3. Create revenue collection in firestore
        const revenue = { ...revenueObj };
        revenue.productId = id;
        revenue.name = product.name;
        revenue.cost = product.cost;
        revenue.photoURL = product.photos[0];
        revenue.type = product.type;

        await create("revenue", { ...revenue });

        // TODO navigate to product dashboard
        navigate("/product");
    };

    /**
     * ? Side effect
     * * 1. When product type change, update details
     */
    useEffect(() => {
        const { fields } = productDetails[type];
        fields.forEach((field) => {
            field.content = "";
        });
        setDetails(fields);
    }, [type]);

    return (
        <section className="flow">
            <h5>Thêm mới sản phẩm</h5>
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
                    <div
                        className="d-flex justify--center items--center"
                        style={{
                            width: "5rem",
                            height: "5rem",
                            border: "thin dashed",
                            cursor: "pointer",
                        }}
                        onClick={handleClicktoOpenFile}
                    >
                        <AiFillPlusSquare />
                        <input
                            type="file"
                            id="file"
                            ref={photoRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: "none" }}
                        />
                    </div>
                    {images.map((image, index) => {
                        const file = image;
                        file.preview = URL.createObjectURL(file);

                        return (
                            <div key={index} className="form--photos">
                                <span
                                    onClick={() => handleDelImage(file)}
                                    className="d-inline-block"
                                >
                                    <TiDelete />
                                </span>
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    src={file.preview}
                                    alt="product img"
                                />
                            </div>
                        );
                    })}
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
                        ref={nameRef}
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
                        ref={descRef}
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
                        ref={costRef}
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
                <div className="d-flex" style={{ flexWrap: "wrap" }}>
                    {Object.keys(productDetails).map((key, index) => (
                        <div
                            key={index}
                            className={`form--button ${
                                productDetails[key].label === type
                                    ? "active"
                                    : ""
                            }`}
                            onClick={() =>
                                handleChangeType(productDetails[key].label)
                            }
                        >
                            {productDetails[key].label}
                        </div>
                    ))}
                </div>
                {details &&
                    details.map(({ name, label, content }, index) => (
                        <div className="form--group" key={index}>
                            <input
                                className="form--input"
                                type="text"
                                id={name}
                                value={content}
                                onChange={(e) => handleDetailChange(e, index)}
                                placeholder=" "
                            />
                            <label className="form--label" htmlFor={name}>
                                Nhập {label}:
                            </label>
                        </div>
                    ))}
                {/* Nhập thông tin hàng tồn */}
                <div className="fs-400" style={{ fontWeight: "700" }}>
                    Hàng tồn
                </div>
                {skus.map((sku, index) => (
                    <div className="d-flex" key={index}>
                        <div className="form--group" style={{ flex: 1 }}>
                            <input
                                className="form--input"
                                id={"type" + index}
                                name="type"
                                onChange={(e) => handleSkus(e, index)}
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
                                onChange={(e) => handleSkus(e, index)}
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
                <div>
                    <div
                        className="button fs-200"
                        button-variant="outlined"
                        button-color="green"
                        onClick={handleCreateSku}
                    >
                        thêm loại
                    </div>
                </div>
                <button
                    className="button"
                    button-variant="contained"
                    button-color="green"
                >
                    thêm mới
                </button>
            </form>
        </section>
    );
};

export default AddProduct;
