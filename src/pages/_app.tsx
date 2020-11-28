import React from "react";
import { AuthProvider } from "../contexts/Auth";

const MyApp = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </React.Fragment>
    );
};

export default MyApp;
