// Import library
import React from "react";

// Import components

const ReviewCard = ({ data }) => {
    return (
        <div className="product-review-content d-flex">
            <div className="product-review-image">
                <img src={data.photoURL} alt={data.name} />
            </div>
            <div className="product-review-info flow">
                <div className="product-review-username">
                    {data.displayName}
                </div>
                <div className="product-review-stars">
                    <span className="material-symbols-rounded text-primary-400">
                        star
                    </span>
                    <span className="material-symbols-rounded text-primary-400">
                        star
                    </span>
                    <span className="material-symbols-rounded text-primary-400">
                        star
                    </span>
                    <span className="material-symbols-rounded text-primary-400">
                        star
                    </span>
                    <span className="material-symbols-rounded">star</span>
                </div>
                <div className="product-review-time">{data.createdAt}</div>
                <p className="product-review-message">{data.content}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
