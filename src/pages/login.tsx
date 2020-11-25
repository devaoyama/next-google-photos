import React from "react";
import {useRouter} from "next/router";

const Login = () => {
    const router = useRouter();

    const handleClick = async () => {
        // ログイン処理
        await router.push('/');
    };

    return (
        <div>
            <div>Login</div>
            <button onClick={handleClick}>ログイン</button>
        </div>
    );
};

export default Login;
