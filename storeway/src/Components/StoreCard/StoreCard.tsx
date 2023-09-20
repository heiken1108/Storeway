import './StoreCard.css'
import Favorite from '../Favorite/Favorite'
import { useNavigate } from 'react-router-dom'

interface StoreProps {
	logoSource: string
	name: string
	id: string
	showLogo: boolean
}

const StoreCard = ({ logoSource, name, id, showLogo }: StoreProps) => {
	const navigate = useNavigate()

	function handleStoreClick() {
		navigate('/project1/store/' + id)
	}

	function handleFavouriteClick() {
		//Sjekk om den er favoritt fra før av, dersom den er det, fjern den fra favoritter, hvis ikke, legg den til
		const favorites = localStorage.getItem('FavoriteList')
		if (favorites === null) {
			localStorage.setItem('FavoriteList', `${id}`)
		} else {
			const favoriteList = favorites.split(',')

			if (favoriteList.includes(id.toString())) {
				const index = favoriteList.indexOf(id)
				favoriteList.splice(index, 1)
			} else {
				favoriteList.push(id)
			}
			const newStorrage = favoriteList.join(',')
			newStorrage === ''
				? localStorage.removeItem('FavoriteList')
				: localStorage.setItem('FavoriteList', newStorrage)
		}
	}

	return (
		<div className="backgroundBody">
			<div className="mainBody" onClick={handleStoreClick}>
				<h3 className="nameTitle" role="nameItem">
					{name}
				</h3>
				{showLogo && (
					<div className="logoDiv">
						<img src={logoSource} alt="Store Logo" role="imgItem" />
					</div>
				)}
			</div>
			<div className="favoriteDiv">
				<Favorite handleClick={handleFavouriteClick} id={id} />
			</div>
		</div>
	)
}

export default StoreCard
