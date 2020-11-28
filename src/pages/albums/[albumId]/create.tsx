import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Auth from "../../../components/Auth";
import { AuthContext } from "../../../contexts/Auth";

const Create = () => {
    const { accessToken } = useContext(AuthContext);

    const [image, setImage] = useState(null);

    const router = useRouter();
    const { albumId } = router.query;

    const handleClick = async () => {
        if (!accessToken) return;

        const requestInit: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-type': 'application/octet-stream',
                'X-Goog-Upload-Content-Type': 'image/jpeg',
                'X-Goog-Upload-Protocol': 'raw'

            },
            body: image
        };

        const res = await fetch('https://photoslibrary.googleapis.com/v1/uploads', requestInit)
        const uploadToken = await res.text();

        const requestInit2: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                albumId,
                newMediaItems: [{
                    simpleMediaItem: {
                        uploadToken: uploadToken
                    }
                }]
            })
        };

        const mediaItems = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', requestInit2);
        console.log(await mediaItems.json());
        await router.push(`/albums/${albumId}`);
    };

    return (
        <Auth>
            <div>
                <Link href="/albums/[albumId]" as={`/albums/${albumId}`}>画像一覧</Link>
            </div>
            <div>作成</div>
            <div>
                <input type="file" onChange={event => setImage(event.target.files[0])} />
                <button onClick={handleClick}>アップロード</button>
            </div>
        </Auth>
    );
};

export default Create;
