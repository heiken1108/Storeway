import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Store } from '../lib/types'
import { useNavigate } from 'react-router-dom'
import StandardButton from '../Components/Button/StandardButton'
import './StorePage.css'
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from '@tanstack/react-query'

export default function Storepage() {
	return (
		<QueryClientProvider client={queryClient}>
			<GetStore />
		</QueryClientProvider>
	)
}

const queryClient = new QueryClient()

function GetStore() {
	const { storeID } = useParams()
	const [store, setStore] = useState<Store | undefined>(undefined)
	const [URL, setURL] = useState(
		'https://kassal.app/api/v1/physical-stores/' + storeID,
	)
	const navigate = useNavigate()

	const { isLoading, refetch } = useQuery({
		queryKey: ['Test'],
		queryFn: () =>
			fetch(URL, {
				headers: {
					Authorization: 'Bearer eZPWuKmg1sPpchBhU4rsF6uAFICgyyBsHVs2Jaaw',
				},
			}).then(res => res.json()),
		onSuccess: rawData => {
			const store: Store = {
				address: rawData.data.address,
				email: rawData.data.email,
				fax: rawData.data.fax,
				id: rawData.data.id,
				name: rawData.data.name,
				openingHours: rawData.data.openingHours,
				phone: rawData.data.phone,
				position: rawData.data.position,
				website: rawData.data.website,
				logo: rawData.data.logo,
			}
			setStore(store)
		},
	})

	useEffect(() => {
		refetch()
	}, [URL, refetch])

	useEffect(() => {
		setURL('https://kassal.app/api/v1/physical-stores/' + storeID)
	}, [storeID])

	function handleStoreChange(direction: boolean) {
		if (direction) {
			let nextID: number
			if (storeID) {
				nextID = Number(storeID) + 1
				navigate('/store/' + nextID)
			}
		} else {
			let nextID: number
			if (storeID) {
				nextID = Number(storeID) - 1
				navigate('/store/' + nextID)
			}
		}
	}

	if (isLoading) return <div>Loading...</div>

	return (
		<div className="container">
			<StandardButton
				text={'←'}
				state={false}
				handleClick={() => handleStoreChange(false)}
			/>
			<div className="information-container">
				<div className="logo-name">
					<img src={store?.logo}></img>
					<h2> {store?.name} </h2>
				</div>
				<div className="company-info">
					<p> {store?.address} </p>
					<p> Telefon: {store?.phone} </p>
					<h3> Åpningstider: </h3>
					<div className="opening-hours">
						<p>
							{' '}
							Mandag:{' '}
							{store?.openingHours.monday
								? store.openingHours.monday
								: 'Stengt'}
						</p>
						<p>
							{' '}
							Tirsdag:{' '}
							{store?.openingHours.tuesday
								? store.openingHours.tuesday
								: 'Stengt'}
						</p>
						<p>
							{' '}
							Onsdag:{' '}
							{store?.openingHours.wednesday
								? store.openingHours.wednesday
								: 'Stengt'}
						</p>
						<p>
							{' '}
							Torsdag:{' '}
							{store?.openingHours.thursday
								? store.openingHours.thursday
								: 'Stengt'}
						</p>
						<p>
							{' '}
							Fredag:{' '}
							{store?.openingHours.friday
								? store.openingHours.friday
								: 'Stengt'}
						</p>
						<p>
							{' '}
							Lørdag:{' '}
							{store?.openingHours.saturday
								? store.openingHours.saturday
								: 'Stengt'}
						</p>
						<p>
							{' '}
							Søndag:{' '}
							{store?.openingHours.sunday
								? store.openingHours.sunday
								: 'Stengt'}
						</p>
					</div>
					<a href={store?.website}> {store?.website} </a>
				</div>
			</div>
			<StandardButton
				text={'→'}
				state={false}
				handleClick={() => handleStoreChange(true)}
			/>
		</div>
	)
}
