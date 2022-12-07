// Import library
import { Link } from "react-router-dom";

// Import icons
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

// Import components
import { Loading } from "../../../components";
import { useGetCollection } from "../../../hooks";

const Product = () => {
    // ? Get data in custom hook
    const [loading, data] = useGetCollection({
        collectionName: "products",
    });
    console.log("render");
    /**
     * ? Handle event function
     * * 1. Delete product method
     */
    const handleClick = async (product) => {
        console.log(product);
    };

    if (loading) {
        return (
            <section>
                <Loading />
            </section>
        );
    }

    if (data) {
        return (
            <section className="flow">
                <div className="d-flex justify--between items--center">
                    <h5>Quản lý sản phẩm</h5>
                    <Link
                        to="/add_product"
                        className="button"
                        button-variant="contained"
                        button-color="green"
                    >
                        thêm sản phẩm
                    </Link>
                </div>
                <div style={{ width: "100%", overflowX: "scroll" }}>
                    <table
                        className="table"
                        style={{ width: "max(100%, 60rem)" }}
                    >
                        <thead className="table--head">
                            <tr>
                                <th></th>
                                <th>hình ảnh</th>
                                <th>tên sản phẩm</th>
                                <th>số lượng</th>
                                <th>giá</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="table--body">
                            {/* Nếu chưa có dữ liệu sản phẩm */}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={6}>
                                        Chưa có dữ liệu sản phẩm!
                                    </td>
                                </tr>
                            )}
                            {/* Có dữ liệu sản phẩm */}
                            {data.length > 0 &&
                                data.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                style={{
                                                    width: "10rem",
                                                    height: "10rem",
                                                    objectFit: "cover",
                                                }}
                                                src={product.photos[0]}
                                                alt={product.name}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.total}</td>
                                        <td>{product.cost}</td>
                                        <td>
                                            <Link
                                                to={`/edit_product/${product.id}`}
                                                className="table--button"
                                                style={{
                                                    marginRight: "0.25rem",
                                                }}
                                            >
                                                <FiEdit />
                                            </Link>
                                            <div
                                                className="table--button"
                                                onClick={() =>
                                                    handleClick(product)
                                                }
                                            >
                                                <RiDeleteBinLine />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </section>
        );
    }
};

export default Product;
