// Import library
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
} from "firebase/firestore";

// Import components
import { db } from "../config";

/**
 * TODO Create all methods in firebase hooks
 * * 1. Create new item in collection
 * * 2. Update item in collection with id
 * * 3. Get all item in collection with / without condition
 * * 4. Get item in collection with id
 */
export function create(collectionName, collectionData, collectionId = null) {
    if (!collectionId) {
        const docRef = collection(db, collectionName);
        return addDoc(docRef, collectionData);
    }

    const docRef = doc(db, collectionName, collectionId);
    return setDoc(docRef, collectionData);
}

export function update(collectionName, collectionId, collectionData) {
    const docRef = doc(db, collectionName, collectionId);
    return updateDoc(docRef, collectionData);
}

export function all(collectionName, collectionCondition = null) {
    if (!collectionCondition) {
        /**
         * ? Have condition
         * TODO Get all items in collection
         */
        return getDocs(collection(db, collectionName));
    }

    /**
     * ? Haven't condition
     * TODO Get all items in collection that fits condition
     */
    const { field, condition, data } = collectionCondition;
    const q = query(
        collection(db, collectionName),
        where(field, condition, data)
    );

    return getDocs(q);
}

export function findById(collectionName, collectionId) {
    const docRef = doc(db, collectionName, collectionId);
    return getDoc(docRef);
}
