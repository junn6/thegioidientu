// Import library
import { Link } from "react-router-dom";

// Import components

const ProductCard = ({ data }) => {
    return (
        <div className="product-card flow">
            <div className="product-card-img">
                <Link to={`/product/${data.id ? data.id : data.productId}`}>
                    <img
                        className="img-fluid"
                        src={data.photos ? data.photos[0] : data.photoURL}
                        alt={data.name}
                    />
                </Link>
            </div>
            <Link
                className="d-block"
                to={`/product/${data.id ? data.id : data.productId}`}
            >
                <h5 className="product-card-name text-truncate">{data.name}</h5>
            </Link>
            <p className="product-card-cost">{data.cost.format}</p>
        </div>
    );
};

export default ProductCard;
