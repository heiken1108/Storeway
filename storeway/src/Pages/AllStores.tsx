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
import { StoresDropdown } from '../data/Stores'


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

function GetStores() {
    const [stores, setStores] = useState<Store[]>([]);
    const [URL, setURL] = typeof(Storage) === "undefined" ? useState('https://kassal.app/api/v1/physical-stores?size=100') : useState('https://kassal.app/api/v1/physical-stores?size=100&group=' + localStorage.getItem("currentStoreCookie"));

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

    function handleStoreChange(storeName: string){
        console.log("Stuker med handlestorechange")
        setURL('https://kassal.app/api/v1/physical-stores?size=100&group=' + storeName);
        //Setter cookie ved endring
        localStorage.setItem("currentStoreCookie",storeName);
        
    }

    useEffect(() => {
        console.log("Setter igang første useeffekt");
        refetch();
    }, [URL]);
    
  	if (isLoading) return 'Laster inn...'

	return (
		<div>
            <div className='Dropdowncontainer'>
                
                <Dropdown stores={StoresDropdown} handleStoreChange={handleStoreChange}/> 
                <Dropdown stores={StoresDropdown} handleStoreChange={handleStoreChange}/>
                <Dropdown stores={StoresDropdown} handleStoreChange={handleStoreChange}/>
                <Dropdown stores={StoresDropdown} handleStoreChange={handleStoreChange}/>
            </div>
            <div className='StoreCardContainer'> 
                {stores.map((store) => (
                    <StoreCard key={store.id} city={store.address} name={store.name} logoSource={store.logo} />
                ))}
            </div>
        </div>
	)
}