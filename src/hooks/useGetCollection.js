// Import library
import { useEffect, useState } from "react";

// Import components
import { all } from "../utils";

export default function useGetCollection({
    collectionName,
    collectionCondition = null,
}) {
    // ? Set up states variables
    const [props, setProps] = useState({ collectionName, collectionCondition });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [reload, setReload] = useState(false);

    async function getData(collectionName, collectionCondition) {
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
    }

    // ? Set up side effect
    useEffect(() => {
        getData(props.collectionName, props.collectionCondition);
    }, [props]);

    useEffect(() => {
        if (reload) {
            getData(props.collectionName, props.collectionCondition);
            setReload(false);
        }
    }, [reload, props]);

    return [loading, data, setReload, setProps];
}
