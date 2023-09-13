import "./Favorite.css";
import { useState } from "react";
import IonIcon from '@reacticons/ionicons';

interface MyProp {
    handleClick: () => void;
    id: string;
}
export default function Favorite(props: MyProp) {
    const [isClick, setClick] = useState(localStorage.getItem(props.id) === null ? false : true);
    function click() {
        setClick(!isClick);
        props.handleClick();
    }
    return (
        <IonIcon name={isClick ? "heart" : "heart-outline"} onClick={() => click()} className="heartIcon" />
    )
}