import "./StoreCard.css"
import { useNavigate } from 'react-router-dom';


interface StoreProps {
    logoSource: string,
    name: string,
    id: string
    city: string
}

const StoreCard = ({logoSource, name, city, id}: StoreProps) => {
    const navigate = useNavigate();

    function handleStoreClick() {
        navigate('/store/' + id)
    }

    return (
        <div className="mainBody" onClick={handleStoreClick}>
            <h3 className="nameTitle">{name}</h3>
            <div className="logoDiv">
                <img src={logoSource}></img>
            </div>
            <h3 className="cityTitle">{city}</h3>
        </div>
    )
}

export default StoreCard