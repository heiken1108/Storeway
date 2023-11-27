import { useEffect, useState } from 'react'
import FavoriteData from './FavoriteData'

interface IProps {
	showLogo: boolean
}
/**
 * A container which contains all the favorited stores
 * @param props consisting of a boolean value which determines if the logo should be shown
 * @returns a container which contains all the favorited stores
 */
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
