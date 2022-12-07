// Import library
import { useEffect, useState } from "react";

// Import components
import { all } from "../utils";

export default function useGetCollection({
    collectionName,
    collectionCondition = null,
}) {
    // ? Set up states variables
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    // ? Set up side effect
    useEffect(() => {
        const getData = async (collectionName, collectionCondition) => {
            const dataSnapshot = await all(collectionName, collectionCondition);

            // ? Create data array
            const dataRs = [];
            dataSnapshot.forEach((doc) => {
                // TODO Format and push data in data array
                dataRs.push({ id: doc.id, ...doc.data() });
            });

            // TODO Set data in data state and update loading state
            setData(dataRs);
            setLoading(false);
        };

        getData(collectionName, collectionCondition);
    }, [collectionName, collectionCondition]);

    return [loading, data];
}
