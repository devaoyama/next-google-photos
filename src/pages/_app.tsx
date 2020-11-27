import React from "react";
import { AuthProvider } from "../contexts/Auth";

const MyApp = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default MyApp;
