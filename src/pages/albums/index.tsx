import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/Auth";
import Auth from "../../components/Auth";
import Link from "next/link";

const Index = () => {
    const { accessToken } = useContext(AuthContext);

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if (!accessToken) return;

        const requestInit: RequestInit = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        fetch('https://photoslibrary.googleapis.com/v1/albums', requestInit)
            .then(async (response) => {
                const { albums } = await response.json();
                setAlbums(albums);
            })
        ;
    }, [accessToken]);

    return (
        <Auth>
            <div>
                <Link href="/">トップ</Link>
                <ul>
                    {albums ? albums.map(item => {
                        return (
                            <li key={item.id}>
                                <Link href="/albums/[albumId]" as={`/albums/${item.id}`}>
                                    {item.title}
                                </Link>
                            </li>
                        );
                    }) : (
                        <div>アルバムはありません</div>
                    )}
                </ul>
            </div>
        </Auth>
    );
};

export default Index;
