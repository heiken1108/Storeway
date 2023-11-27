import useFavoriteStore from '../../hooks/useFavoriteStore'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'
import StoreCard from '../StoreCard/StoreCard'

interface IProps {
	id: string
	showLogo: boolean
}
/**
 * A storecard containing the favorited store
 * @param props consisting of id and showLogo
 * @returns a storecard containing the favorited store
 */
export default function FavoriteData(props: IProps) {
	const { data, isLoading } = useFavoriteStore(props.id)

	if (isLoading) {
		return (
			<div className="backgroundBody">
				<LoadingAnimation />
			</div>
		)
	}

	if (!data) {
		return <p>❌</p>
	}

	return (
		<StoreCard
			key={data.data.id}
			name={data.data.name}
			logoSource={data.data.logo}
			id={data.data.id}
			showLogo={props.showLogo}
		/>
	)
}
