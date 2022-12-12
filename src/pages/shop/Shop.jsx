// Import library
import { useEffect, useState, useRef } from "react";

// Import components
import { useGetCollection } from "../../hooks";
import { Loading, ProductCard } from "../../components";
import { type as productType } from "../../constants";

const Shop = () => {
    // ? Get data in custom hook
    const [loading, data] = useGetCollection({
        collectionName: "product",
    });

    // ? Set up ref variables
    const searchRef = useRef();

    // ? Set up states variables
    const [products, setProducts] = useState();
    const [filter, setFilter] = useState({
        type: "type",
        query: null,
    });

    /**
     * ? Handle event function
     * * 1. Handle search when click search button
     * * 2. Handle filter when click product type button
     */
    const handleSearchClick = (search) => {
        if (search.length !== 0) {
            setFilter({ type: "search", query: search });
        } else {
            setFilter({ type: "search", query: null });
            searchRef.current.focus();
        }
    };

    const handleCategoryClick = (slug) => {
        setFilter({ type: "category", query: slug });
    };

    /**
     * ? Side effect
     * * 1. Set products
     * * 2. Get products with filter
     */
    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    useEffect(() => {
        const { type, query } = filter;

        switch (type) {
            case "category":
                if (!query) {
                    setProducts(data);
                    break;
                }

                const dataFilter = data.filter(
                    (product) => product.slug === query
                );
                setProducts(dataFilter);
                break;
            case "search":
                if (!query) {
                    break;
                }

                const dataSearch = data.filter(
                    (product) =>
                        product.name
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        product.desc.toLowerCase().includes(query.toLowerCase())
                );
                setProducts(dataSearch);
                break;
            default:
                break;
        }
    }, [data, filter]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="shop flow">
            <div className="section-heading">Cửa hàng</div>
            {/* Search input */}
            <div className="shop-search">
                <div className="shop-search-input form-group">
                    <input
                        type="text"
                        ref={searchRef}
                        placeholder="Tìm kiếm sản phẩm"
                        className="form-input"
                    />
                </div>
                <div
                    className="shop-search-btn"
                    onClick={() => handleSearchClick(searchRef.current.value)}
                >
                    <span className="material-symbols-rounded">search</span>
                </div>
            </div>
            {/* Category */}
            <div className="shop-categories d-flex items-center">
                <div
                    className="shop-categories-item"
                    style={{ height: "100%" }}
                    data-visible={filter.query === null}
                    onClick={() => handleCategoryClick(null)}
                >
                    <p className="fs-200 text-neutral-500 fw-medium text-capitalize">
                        tất cả
                    </p>
                </div>
                {productType.map((category, index) => (
                    <div
                        key={index}
                        className="shop-categories-item d-flex items-center"
                        data-visible={filter.query === category.slug}
                        onClick={() => handleCategoryClick(category.slug)}
                    >
                        <img
                            style={{
                                width: "2rem",
                                aspectRatio: "1",
                                objectFit: "cover",
                            }}
                            src={category.url}
                            alt="Banner shop"
                        />
                        <p className="fs-200 text-neutral-500 fw-medium text-capitalize">
                            {category.label}
                        </p>
                    </div>
                ))}
            </div>
            {/* Shop show product */}
            <div className="shop-grid d-grid">
                {products &&
                    products.map((product) => {
                        /* Single product card */
                        return <ProductCard key={product.id} data={product} />;
                    })}
            </div>
        </div>
    );
};

export default Shop;
