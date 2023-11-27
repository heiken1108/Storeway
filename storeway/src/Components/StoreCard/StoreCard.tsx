import './StoreCard.css'
import Favorite from '../Favorite/Favorite'
import { useNavigate } from 'react-router-dom'

interface StoreProps {
	logoSource: string
	name: string
	id: string
	showLogo: boolean
}
/**
 * This component is a storecard which contains a store
 * @param logoSource the source of the logo
 * @param name the name of the store
 * @param id the id of the store
 * @param showLogo a boolean value which determines if the logo should be shown
 * @returns a storecard containing the store
 */
const StoreCard = ({ logoSource, name, id, showLogo }: StoreProps) => {
	const navigate = useNavigate()

	function handleStoreClick() {
		navigate('/project1/store/' + id)
	}

	function handleFavouriteClick() {
		const favorites = localStorage.getItem('FavoriteList')
		if (favorites === null) {
			localStorage.setItem('FavoriteList', `${id}`)
		} else {
			const favoriteList = favorites.split(',')

			if (favoriteList.includes(id.toString())) {
				const index = favoriteList.indexOf(id.toString())
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
