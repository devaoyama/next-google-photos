import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import firebase, { auth } from "../utils/Firebase";
import { AuthContext } from "../contexts/Auth";

const Login = () => {
    const router = useRouter();

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            auth.getRedirectResult().then(async ({ credential }) => {
                console.log(credential);
                await router.push('/');
            });
        }
    }, [currentUser]);

    const handleClick = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata');
        await auth.signInWithRedirect(provider);
    };

    return (
        <div>
            <div>Login</div>
            <button onClick={handleClick}>ログイン</button>
        </div>
    );
};

export default Login;
