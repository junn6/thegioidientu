// Import library
import React from "react";
import { useParams } from "react-router-dom";

// Import components
import { useGetCollection } from "../../../hooks";
import { Loading, ProductCard } from "../../../components";

const ProductCategory = () => {
    // ? Get slug from params
    const { slug } = useParams();

    // ? Get data in custom hook
    const [loading, products] = useGetCollection({
        collectionName: "product",
        collectionCondition: {
            field: "slug",
            condition: "==",
            data: slug,
        },
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="category flow">
            <div className="section-heading">Danh mục sản phẩm</div>
            <div className="category-grid d-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCategory;
