import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/Auth";

const Auth = ({ children }) => {
    const router = useRouter();

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return children;
    }

    router.push('/login');

    return null;
};

export default Auth;
