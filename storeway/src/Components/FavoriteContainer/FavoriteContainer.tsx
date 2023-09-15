import { useEffect, useState } from "react";
import FavoriteData from "./FavoriteData"

export default function FavoriteContainer(){
    const [ids, setIds] = useState<string[] | undefined>([]);  

    useEffect(() => {
        const favorites = localStorage.getItem('FavoriteList');
        const favoriteList = favorites?.split(',');
        setIds(favoriteList);
    }, [])

    return (
        <div>
            {ids ? (
                ids.map((id) => (
                    <FavoriteData id={id} key={id}/>
                )))
            :   (
                    <h1>Ingen favoritter valgt</h1>
                )
            }
            
        </div>
    )
}