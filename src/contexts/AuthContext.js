// Import library
import React, { useEffect, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

// Import components
import { auth } from "../config";

/**
 * TODO:
 * * 1. Create context
 * * 2. Create hooks for authentication
 * * 3. Create provider
 */
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    /**
     * ? State variable
     * * 1. Children are mounted
     * * 2. Get user data
     */
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    /**
     * TODO: Get auth state of firebase auth in side effect with cleanup function
     */
    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => {
            unsubcribe();
        };
    }, []);

    /**
     * TODO: Defines all the methods used in firebase auth
     */
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signout() {
        return signOut(auth);
    }

    /**
     * TODO: Create value prop of auth provider
     */
    const value = {
        currentUser,
        signup,
        signin,
        signout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
