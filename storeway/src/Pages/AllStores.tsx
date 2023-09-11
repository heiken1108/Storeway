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
            setStores(allStores);
        },
  	})

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

    useEffect(() => {
        refetch();
    }, [URL]);
    
  	if (isLoading) return 'Laster inn...'

	return (
		<div>
            <div className='Dropdowncontainer'>
                <Dropdown stores={StoresDropdown} handleStoreChange={handleStoreChange} type={'store'}/> 
                <Dropdown cities={CitiesDropdown} handleCityChange={handleCityChange} type={'city'}/>
            </div>
            <div className='StoreCardContainer'> 
                {stores.map((store) => (
                    <StoreCard key={store.id} city={store.address} name={store.name} logoSource={store.logo} />
                ))}
            </div>
        </div>
	)
}