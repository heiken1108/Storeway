import { useEffect, useState } from 'react'
import StoreCard from '../Components/StoreCard/StoreCard'
import './AllStores.css'
import { useQuery } from '@tanstack/react-query'
import { OpeningHours, Store } from '../lib/types'
import { StoresDropdown, CitiesDropdown } from '../data/Dropdown'
import StandardButton from '../Components/Button/StandardButton'
import Dropdown from '../Components/Dropwdown/Dropdown'
import FavoriteContainer from '../Components/FavoriteContainer/FavoriteContainer'
import ToggleSwitch from '../Components/ToggleSwitch/ToggleSwitch'
import LoadingAnimation from '../Components/LoadingAnimation/LoadingAnimation'

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

	const [showLogo, setShowLogo] = useState(
		sessionStorage.getItem('LogoState') === null
			? true
			: sessionStorage.getItem('LogoState') === 'false'
			? false
			: true,
	)

	const handleToggleChange = (isChecked: boolean) => {
		setShowLogo(isChecked)
		sessionStorage.setItem('LogoState', isChecked.toString())
	}

	const { isLoading, refetch, isError } = useQuery({
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

	if (isLoading)
		return (
			<div className="loadingContainer">
				<div className="lds-default2">
					<LoadingAnimation />
				</div>
			</div>
		)

	if (isError)
		return (
			<div className="ErrorPage">
				<div id="apiErrorMessage" className="errorMessage">
					<div className="errorIcon">❌</div>
					<div className="errorText">
						Noe gikk galt. API-et kunne ikke lastes.
					</div>
				</div>
			</div>
		)

	return (
		<div>
			<div className="Dropdowncontainer">
				<div className="Filtercontainer">
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
				</div>
				<div className="FavAndLogocontainer">
					<StandardButton
						text={'Favoritter'}
						state={showFavourite}
						handleClick={toggleFavourite}
					/>
					<div className="toggleTitle">
						<p>Vis logo</p>
						<ToggleSwitch
							onChange={handleToggleChange}
							defaultChecked={showLogo}
						/>
					</div>
				</div>
			</div>
			<div className="StoreCardContainer">
				{showFavourite ? (
					<FavoriteContainer showLogo={showLogo} />
				) : (
					stores.map(store => (
						<StoreCard
							key={store.id}
							name={store.name}
							logoSource={store.logo}
							id={store.id.toString()}
							showLogo={showLogo}
						/>
					))
				)}
			</div>
		</div>
	)
}
