import React from "react";
import { AuthProvider } from "../contexts/Auth";
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => {
    return (
        <React.Fragment>
            <Head>
                <script src="https://apis.google.com/js/api.js"></script>
            </Head>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </React.Fragment>
    );
};

export default MyApp;
