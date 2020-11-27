import React, {createContext, useEffect} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { auth } from '../utils/Firebase';

type AuthContextProps = {
    currentUser: firebase.User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AuthContext.Provider value={{ currentUser: user }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
