import './Favorite.css'
import { useEffect, useState } from 'react'
import IonIcon from '@reacticons/ionicons'

interface MyProp {
	handleClick: () => void
	id: string
}
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
			onClick={() => click()}
			className="heartIcon"
		/>
	)
}
