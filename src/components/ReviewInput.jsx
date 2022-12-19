// Import library
import React, { useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";

// Import components
import { dateFormat, update } from "../utils";

const ReviewInput = ({ user, review, setReview }) => {
    // ? Set up ref variables
    const inputRef = useRef();

    // ? Set up state variables
    const [star, setStar] = useState(1);
    const [error, setError] = useState();

    /**
     * ? Handle event function
     * * 1. Handle when click review button
     */
    async function handleClick() {
        // TODO Validation data
        if (!star || !inputRef.current.value) {
            setError("Bạn chưa điền đủ thông tin đánh giá!");
            return;
        }

        // TODO Create and update data review in firestore
        const data = {
            name: user.fullName,
            displayName: user.displayName,
            photoURL: user.photoURL,
            star,
            content: inputRef.current.value,
            createdAt: dateFormat(Date.now()),
        };

        review.comment.push(data);

        const starTotal = review.comment.reduce((prev, item) => {
            return prev + item.star;
        }, 0);

        const starAvarage = Math.round(starTotal / review.comment.length);
        await update("review", review.id, {
            comment: [...review.comment],
            starAvarage,
            total: review.comment.length,
        });

        // TODO Update UI
        setReview((prev) => ({
            ...prev,
            comment: review.comment,
            starAvarage,
            total: review.comment.length,
        }));

        // TODO Set empty star and review input
        setStar(1);
        inputRef.current.value = "";

        // TODO Set empty error
        setError(null);
    }

    return (
        user && (
            <div>
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
                <div>
                    <p className="ff-secondary fs-400 fw-semibold">
                        Viết đánh giá
                    </p>
                </div>
                <ReactStars
                    edit={true}
                    size={24}
                    count={5}
                    value={star}
                    onChange={(newValue) => setStar(newValue)}
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
        )
    );
};

export default ReviewInput;
