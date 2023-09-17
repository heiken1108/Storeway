import { useEffect, useState } from 'react'
import StoreCard from '../Components/StoreCard/StoreCard'
import './AllStores.css'
import { useQuery } from '@tanstack/react-query'
import { OpeningHours, Store } from '../lib/types'
import { StoresDropdown, CitiesDropdown } from '../data/Dropdown'
import StandardButton from '../Components/Button/StandardButton'
import Dropdown from '../Components/Dropwdown/Dropdown'
import FavoriteContainer from '../Components/FavoriteContainer/FavoriteContainer'

const kassalappURL = 'https://kassal.app/api/v1/physical-stores?size=100'

export default function AllStores() {
	let kassalappURLTemp = kassalappURL
	const [stores, setStores] = useState<Store[]>([])
	if (sessionStorage.getItem('currentStoreCookie') !== null) {
		kassalappURLTemp += '&group=' + sessionStorage.getItem('currentStoreCookie')
	}
	if (sessionStorage.getItem('currentLatCookie') !== null) {
		kassalappURLTemp +=
			'&lng=' +
			sessionStorage.getItem('currentLngCookie') +
			'&lat=' +
			sessionStorage.getItem('currentLatCookie')
	}
	const [storeName, setStorename] = useState('')
	const [position, setPoistion] = useState({
		lat: '',
		lng: '',
	})
	const [URL, setURL] = useState(kassalappURLTemp)
	const [showFavourite, setShowFavourite] = useState(
		sessionStorage.getItem('FavouriteStores') === null
			? false
			: sessionStorage.getItem('FavouriteStores') === 'true'
			? true
			: false,
	)

	const { isLoading, refetch } = useQuery({
		queryKey: ['Test'],
		queryFn: () =>
			fetch(URL, {
				headers: {
					Authorization: 'Bearer eZPWuKmg1sPpchBhU4rsF6uAFICgyyBsHVs2Jaaw',
				},
			}).then(res => res.json()),
		onSuccess: rawData => {
			const allStores: Store[] = []
			rawData.data.map(
				(raw: {
					address: string
					email: string
					fax: string
					id: number
					name: string
					openingHours: OpeningHours
					phone: string
					position: { lat: string; lng: string }
					website: string
					logo: string
				}) => {
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
						logo: raw.logo,
					}
					allStores.push(store)
				},
			)
			setStores(allStores)
		},
	})

	function handleStoreChange(selectedStoreName: string) {
		setURL(kassalappURL + '&group=' + storeName)
		setStorename(selectedStoreName)
		let urlParams = ''

		if (selectedStoreName !== '') {
			urlParams += `&group=${selectedStoreName}`
		}

		if (position.lat !== '') {
			urlParams += `&lat=${position.lat}&lng=${position.lng}`
		}

		setURL(kassalappURL + urlParams)

		if (selectedStoreName === '') {
			sessionStorage.removeItem('currentStoreCookie')
		} else {
			sessionStorage.setItem('currentStoreCookie', selectedStoreName)
		}
	}

	function handleCityChange(newPosition: { lat: string; lng: string }) {
		setPoistion(newPosition)
		let urlParams = ''

		if (storeName !== '') {
			urlParams += `&group=${storeName}`
		}

		if (newPosition.lat !== '') {
			urlParams += `&lat=${newPosition.lat}&lng=${newPosition.lng}`
			sessionStorage.setItem('currentLatCookie', newPosition.lat)
			sessionStorage.setItem('currentLngCookie', newPosition.lng)
		} else {
			sessionStorage.removeItem('currentLatCookie')
			sessionStorage.removeItem('currentLngCookie')
		}
		setURL(kassalappURL + urlParams)
	}

	function toggleFavourite() {
		const showFavourite =
			sessionStorage.getItem('FavouriteStores') === null
				? sessionStorage.setItem('FavouriteStores', 'true')
				: sessionStorage.getItem('FavouriteStores')
		if (showFavourite === 'true') {
			sessionStorage.setItem('FavouriteStores', 'false')
			setShowFavourite(false)
		} else {
			sessionStorage.setItem('FavouriteStores', 'true')
			setShowFavourite(true)
		}
	}

	useEffect(() => {
		refetch()
	}, [URL, refetch])

	if (isLoading) return 'Laster inn...'

	return (
		<div>
			<div className="Dropdowncontainer">
				<Dropdown
					stores={StoresDropdown}
					handleStoreChange={handleStoreChange}
					type={'store'}
					label={sessionStorage.getItem('currentStoreCookie')}
				/>
				<Dropdown
					cities={CitiesDropdown}
					handleCityChange={handleCityChange}
					type={'city'}
					label={sessionStorage.getItem('currentLatCookie')}
				/>
				<StandardButton
					text={'Favoritter'}
					state={showFavourite}
					handleClick={toggleFavourite}
				/>
			</div>
			<div className="StoreCardContainer">
				{showFavourite ? (
					<FavoriteContainer />
				) : (
					stores.map(store => (
						<StoreCard
							key={store.id}
							name={store.name}
							logoSource={store.logo}
							id={store.id.toString()}
						/>
					))
				)}
			</div>
		</div>
	)
}
