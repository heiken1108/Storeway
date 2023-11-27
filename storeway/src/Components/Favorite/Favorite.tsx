import './Favorite.css'
import { useEffect, useState } from 'react'
import IonIcon from '@reacticons/ionicons'

interface MyProp {
	handleClick: () => void
	id: string
}
/**
 * A heart icon used to favorite a store
 * @param props consisting of handleClick and the id of the store which is favorited
 * @returns a heart icon which is used to favorite a store
 */
export default function Favorite(props: MyProp) {
	const [isClick, setClick] = useState(false)
	function click() {
		setClick(!isClick)
		props.handleClick()
	}

	useEffect(() => {
		const favorites = localStorage.getItem('FavoriteList')
		const favoriteList = favorites?.split(',')
		if (favoriteList) {
			favoriteList.forEach(e => {
				if (e === props.id.toString()) {
					setClick(true)
				}
			})
		}
	}, [props.id])

	return (
		<IonIcon
			name={isClick ? 'heart' : 'heart-outline'}
			role="heartIcon"
			onClick={() => click()}
			className="heartIcon"
		/>
	)
}
