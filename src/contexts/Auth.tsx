import React, {createContext, useEffect, useState} from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, {auth, db} from '../utils/Firebase';

type AuthContextProps = {
    currentUser: firebase.User | null | undefined
    accessToken: string | null
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined, accessToken: null });

const AuthProvider = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);

    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (!user) return;
        db.collection('users').doc(user.uid).get()
            .then(doc => {
                setAccessToken(doc.data().access_token);
            })
        ;
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AuthContext.Provider value={{ currentUser: user, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
