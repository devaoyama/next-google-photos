import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Auth from "../../../components/Auth";
import { AuthContext } from "../../../contexts/Auth";
import Link from "next/link";

const Index = () => {
    const { accessToken } = useContext(AuthContext);

    const [mediaItems, setMediaItems] = useState([]);

    const router = useRouter();
    const { albumId } = router.query;

    useEffect(() => {
        if (!accessToken) return;

        const requestInit: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ albumId })
        };

        fetch(`https://photoslibrary.googleapis.com/v1/mediaItems:search`, requestInit)
            .then(async (response) => {
                const { mediaItems }  = await response.json();
                setMediaItems(mediaItems);
            })
        ;
    }, [accessToken]);

    return (
        <Auth>
            <div>
                <div>
                    <Link href="/albums">アルバム一覧</Link>
                </div>
                <div>
                    <Link href="/albums/[albumsId]/create" as={`/albums/${albumId}/create`}>
                        画像を追加
                    </Link>
                </div>
                <div>
                    <ul>
                        {mediaItems ? mediaItems.map(item => {
                            return (
                                <li key={item.id} style={{listStyle: "none"}}>
                                    <Image src={item.baseUrl} width={400} height={300}/>
                                </li>
                            );
                        }) : (
                            <div>画像はありません</div>
                        )}
                    </ul>
                </div>
            </div>
        </Auth>
    );
};

export default Index;
