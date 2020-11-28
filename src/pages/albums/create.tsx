import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import Link from "next/link";
import { useRouter } from "next/router";
import Auth from "../../components/Auth";

const Create = () => {
    const [text, setText] = useState(null);

    const { accessToken } = useContext(AuthContext);

    const router = useRouter();

    const handleClick = async () => {
        if (!accessToken) return;

        const requestInit: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ album: { title: text } })
        };

        const album = await fetch('https://photoslibrary.googleapis.com/v1/albums', requestInit);
        console.log(album);
        await router.push('/');
    };

    return (
        <Auth>
            <div>
                <Link href="/">トップ</Link>
            </div>
            <div>
                <input type="text" onChange={event => setText(event.target.value)} />
                <button onClick={handleClick}>作成</button>
            </div>
        </Auth>
    );
};

export default Create;
