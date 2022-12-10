// Import library=
import { useOutlet } from "react-router-dom";

// Import components
import { useAuth } from "../contexts";
import { useGetCollection } from "../hooks";
import Loading from "./Loading";
import Sidebar from "./Sidebar";

const Wrapper = () => {
    const outlet = useOutlet();
    const { currentUser } = useAuth();
    const [loading, data] = useGetCollection({
        collectionName: "user",
        collectionCondition: {
            field: "email",
            condition: "==",
            data: currentUser.email,
        },
    });

    if (loading) {
        return (
            <section
                className="d-flex justify--center items--center"
                style={{ minHeight: "100vh", width: "100vw" }}
            >
                <Loading />
            </section>
        );
    }

    return (
        <main className="wrapper">
            <Sidebar role={data[0].role} />
            {outlet}
        </main>
    );
};

export default Wrapper;
