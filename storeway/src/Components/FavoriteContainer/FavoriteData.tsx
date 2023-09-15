import useFavoriteStore from "../../hooks/useFavoriteStore";
import StoreCard from "../StoreCard/StoreCard";

interface IProps {
    id: string
}

export default function FavoriteData(props: IProps){
    
    const { data, isLoading} = useFavoriteStore(props.id);

    if (isLoading) {
        return <p>Laster...</p>;
    }

    if (!data) {
        return <p>Fant ikke butikken.</p>;
    }

    return (
        <div>
            <StoreCard key={data.data.id} name={data.data.name} logoSource={data.data.logo} id={data.data.id} />
        </div>
    );
}
