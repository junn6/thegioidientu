// Import library
import React from "react";
import ReactStars from "react-rating-stars-component";

// Import components

const ReviewCard = ({ data }) => {
    return (
        <div className="product-review-content d-flex">
            <div className="product-review-image">
                <img src={data.photoURL} alt={data.name} />
            </div>
            <div className="product-review-info flow">
                <div className="d-flex items-center">
                    <div className="product-review-username">
                        {data.displayName}
                    </div>
                    <div className="product-review-stars">
                        <ReactStars size={15} edit={false} value={data.star} />
                    </div>
                </div>
                <p className="product-review-message">{data.content}</p>
                <div className="product-review-time">{data.createdAt}</div>
            </div>
        </div>
    );
};

export default ReviewCard;
