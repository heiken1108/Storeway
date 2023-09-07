import { useEffect, useState } from 'react'

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
    	<QueryClientProvider client={queryClient}>
    		<GetStores />
    	</QueryClientProvider>
  	)
}

const queryClient = new QueryClient()

function GetStores() {
    const [stores, setStores] = useState<Store[]>([]);
    const [URL, setURL] = useState('https://kassal.app/api/v1/physical-stores?size=100');

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
                    website: raw.website
                }
                allStores.push(store);
            })
            setStores(allStores);
        },
  	})

    function handleStoreChange(storeName: string){
        setURL('https://kassal.app/api/v1/physical-stores?size=100&group=' + storeName);
        
    }

    useEffect(() => {
        refetch();
    }, [URL]);
    
  	if (isLoading) return 'Loading...'

	return (
		<div>
            <Dropdown stores={StoresDropdown} handleStoreChange={handleStoreChange}/>
            <div>
                {stores.map((store) => (
                    <h1>{store.name}</h1>
                ))}
            </div>
        </div>
	)
}