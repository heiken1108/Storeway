import "./StoreCard.css"


interface StoreProps {
    logoSource: string,
    name: string,
    city: string
}

const StoreCard = ({logoSource, name, city}: StoreProps) => {
    return (
        <div className="mainBody">
            <h3 className="nameTitle">{name}</h3>
            <div className="logoDiv">
                <img src={logoSource}></img>
            </div>
            <h3 className="cityTitle">{city}</h3>
        </div>
    )
}

export default StoreCard