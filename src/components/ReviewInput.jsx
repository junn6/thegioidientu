// Import library
import React, { useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";

// Import components

const ReviewInput = ({ reviewId, product }) => {
    // ? Set up ref variables
    const inputRef = useRef();

    // ? Set up state variables
    const [star, setStar] = useState(0);

    /**
     * ? Handle event function
     * * 1. Handle when click review button
     */
    function handleClick() {
        const { id, name, cost, photos } = product;
        const data = {
            productId: id,
            name,
            cost,
            photo: photos[0],
            star,
            content: inputRef.current.value,
        };

        console.log(data);
    }

    return (
        <div>
            <div>
                <p className="ff-secondary fs-400 fw-semibold">Viết đánh giá</p>
            </div>
            <ReactStars
                size={30}
                count={5}
                value={star}
                a11y={true}
                emptyIcon={
                    <span className="material-symbols-outlined">star</span>
                }
                filledIcon={
                    <span className="material-symbols-rounded">star</span>
                }
                onChange={(newValue) => {
                    console.log(`Example 2: new value is ${newValue}`);
                    setStar(star);
                }}
            />
            <div className="d-flex items-start">
                <input
                    style={{
                        flexShrink: 0,
                        flexGrow: 1,
                        resize: "none",
                        outline: "none",
                        padding: "0.5rem 1rem",
                    }}
                    ref={inputRef}
                    type="text"
                    placeholder="Đánh giá sản phẩm ..."
                />
                <button
                    className="button"
                    button-variant="contained"
                    button-color="primary"
                    onClick={handleClick}
                >
                    Đánh giá
                </button>
            </div>
        </div>
    );
};

export default ReviewInput;
