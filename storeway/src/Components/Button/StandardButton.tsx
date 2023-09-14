import "./StandardButton.css"

interface IProps {
    text: string;
    state: boolean;
    handleClick: () => void;
}

export default function StandardButton(props: IProps) {

    return (
        <button className={props.state == false? "standardButton": "favouriteButton"} onClick={props.handleClick}>
                {props.text}
        </button>
     
        
    )
}