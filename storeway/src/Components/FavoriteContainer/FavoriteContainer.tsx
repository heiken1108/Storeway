import { useEffect, useState } from 'react'
import FavoriteData from './FavoriteData'

interface IProps {
	showLogo: boolean
}

export default function FavoriteContainer(props: IProps) {
	const [ids, setIds] = useState<string[] | undefined>([])

	useEffect(() => {
		const favorites = localStorage.getItem('FavoriteList')
		const favoriteList = favorites?.split(',')
		setIds(favoriteList)
	}, [])

	return (
		<>
			{ids ? (
				ids.map(id => (
					<FavoriteData id={id} key={id} showLogo={props.showLogo} />
				))
			) : (
				<h1>Ingen favoritter valgt</h1>
			)}
		</>
	)
}
