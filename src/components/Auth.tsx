import React from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/Firebase";

const Auth = ({ children }) => {
    const router = useRouter();

    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (user) {
        return children;
    }

    router.push('/login');
};

export default Auth;
