import React from "react";
import Auth from "../components/Auth";
import {auth} from "../utils/Firebase";

const Index = () => {
    return (
        <Auth>
            <div>
                Hello React
            </div>
            <button onClick={async () => {
                await auth.signOut();
            }}>ログアウト</button>
        </Auth>
    )
};

export default Index;
