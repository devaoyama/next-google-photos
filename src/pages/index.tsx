import React from "react";
import Link from "next/link";
import Auth from "../components/Auth";
import { auth } from "../utils/Firebase";

const Index = () => {
    return (
        <Auth>
            <div>
                Hello React
            </div>
            <button onClick={async () => {
                await auth.signOut();
            }}>ログアウト</button>
            <div>
                <ul>
                    <li>
                        <Link href="/albums">アルバム一覧</Link>
                    </li>
                    <li>
                        <Link href="/albums/create">アルバム作成</Link>
                    </li>
                </ul>
            </div>
        </Auth>
    );
};

export default Index;
