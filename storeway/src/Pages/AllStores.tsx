import { useState } from 'react'

import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query'
import { Store } from '../lib/types'


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

  	const { isLoading} = useQuery({
    	queryKey: ['Test'],
    	queryFn: () =>
      		fetch('https://kassal.app/api/v1/physical-stores?size=100', {headers: {Authorization: 'Bearer eZPWuKmg1sPpchBhU4rsF6uAFICgyyBsHVs2Jaaw'}}).then(
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
    
  	if (isLoading) return 'Loading...'

	return (
		<div>
            {stores.map((store) => (
                <h1>{store.name}</h1>
            ))}
        </div>
	)
}