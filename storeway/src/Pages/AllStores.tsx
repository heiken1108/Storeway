import { useEffect, useState } from 'react'
import StoreCard from '../Components/StoreCard/StoreCard'
import './AllStores.css'

import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query'
import { Store } from '../lib/types'
import Dropdown from '../Components/Dropdown'
import { StoresDropdown, CitiesDropdown } from '../data/Dropdown'
import StandardButton from '../Components/StandardButton'

export default function AllStores(){
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <GetStores />
            </QueryClientProvider>
        </>
  	)
}

const queryClient = new QueryClient()
const kassalappURL = 'https://kassal.app/api/v1/physical-stores?size=100';

function GetStores() {
    const [stores, setStores] = useState<Store[]>([]);
    const [URL, setURL] = sessionStorage.getItem("currentStoreCookie") === null ? useState(kassalappURL) : useState(kassalappURL + '&group=' + sessionStorage.getItem("currentStoreCookie"));
    const [storeName, setStorename] = useState("");
    const [position, setPoistion] = useState({
        lat: '',
        lng: ''
    });
    const [showFavourite, setShowFavourite] = useState(sessionStorage.getItem("FavouriteStores") === null ? false : sessionStorage.getItem("FavouriteStores") === "true" ? true : false);

  	const { isLoading, refetch} = useQuery({
    	queryKey: ['Test'],
    	queryFn: () =>
      		fetch(URL, {headers: {Authorization: 'Bearer eZPWuKmg1sPpchBhU4rsF6uAFICgyyBsHVs2Jaaw'}}).then(
        (res) => res.json(),
        ), onSuccess: (rawData: any) => {
            const allStores: Store[] = []
            rawData.data.map((raw: any) => {
                const store: Store = {
                    address: raw.address,
                    email: raw.email,
                    fax: raw.fax,
                    id: raw.id,
                    name: raw.name,
                    openingHours: raw.openingHours,
                    phone: raw.phone,
                    position: raw.position,
                    website: raw.website,
                    logo: raw.logo
                }
                allStores.push(store);
            })
            if (showFavourite){
                showFavouriteStores(allStores);
            } else {
                setStores(allStores);
            }
        },
  	})

    function showFavouriteStores(allStores: Store[]){
        const favouriteStores: Store[] = [];
        allStores.map((store: Store) => {
            if (localStorage.getItem(store.id.toString()) !== null){
                favouriteStores.push(store);
            }
        })
        setStores(favouriteStores);
    }

    function handleStoreChange(selectedStoreName: string){
        setURL(kassalappURL + '&group=' + storeName);
        setStorename(selectedStoreName);
        if (position.lat == ''){
            setURL(kassalappURL + '&group=' +  selectedStoreName);
        } else {
            setURL(kassalappURL + '&group=' +  selectedStoreName + '&lat=' +  position.lat + '&lng=' + position.lng)
        }
        sessionStorage.setItem("currentStoreCookie",storeName);
    }

    function handleCityChange(position: any){
        setPoistion(position);
        if (storeName == ""){
            setURL(kassalappURL + '&lat=' + position.lat + '&lng=' + position.lng);
        } else {
            setURL(kassalappURL + '&group=' + storeName + '&lat=' +  position.lat + '&lng=' + position.lng );
        }
    }

    function toggleFavourite(){
        let showFavourite = sessionStorage.getItem("FavouriteStores") === null ? sessionStorage.setItem("FavouriteStores", "true") : sessionStorage.getItem("FavouriteStores");
        if (showFavourite === "true"){
            sessionStorage.setItem("FavouriteStores", "false");
            setShowFavourite(false);
        } else {
            sessionStorage.setItem("FavouriteStores", "true");
            setShowFavourite(true);
        }
    }

    useEffect(() => {
        refetch();
    }, [URL, showFavourite]);
    
  	if (isLoading) return 'Laster inn...'

	return (
		<div>
            <div className='Dropdowncontainer'>
                <Dropdown stores={StoresDropdown} handleStoreChange={handleStoreChange} type={'store'}/> 
                <Dropdown cities={CitiesDropdown} handleCityChange={handleCityChange} type={'city'}/>
                <StandardButton text={'Favoritter'} state={showFavourite} handleClick={toggleFavourite}/>
            </div>
            <div className='StoreCardContainer'> 
                {stores.map((store) => (
                    <StoreCard key={store.id} name={store.name} logoSource={store.logo} id={store.id.toString()} />
                ))}
            </div>
        </div>
	)
}