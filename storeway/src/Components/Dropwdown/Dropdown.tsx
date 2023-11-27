import './Dropdown.css'
import { IDropdownCity, IDropdownStore } from '../../lib/types'
import { getLabelFromLat, getLabelFromValue } from '../../data/Dropdown'

interface IProps {
	stores?: IDropdownStore[]
	cities?: IDropdownCity[]
	type: string
	handleStoreChange?: (arg0: string) => void
	handleCityChange?: (arg0: { lat: string; lng: string }) => void
	label: string | null
	disable: boolean
}
/**
 * A dropdown menu used to select a store or city
 * @param props consisting of stores, cities, type, handleStoreChange, handleCityChange, label and disable
 * @returns a dropdown menu used to select a store or city
 */
export default function Dropdown(props: IProps) {
	function handleSelectedStoreChange(option: string) {
		if (props.handleStoreChange) {
			props.handleStoreChange(option)
		}
	}

	function handleSelectedCityChange(option: { lat: string; lng: string }) {
		if (props.handleCityChange && option) {
			props.handleCityChange(option)
		}
	}

	return (
		<div className="dropdown" role="dropdown">
			{props.type === 'store' ? (
				<div>
					<button className="dropbtn" disabled={props.disable}>
						{getLabelFromValue(props.label, props.stores)}
					</button>
					<div className="dropdown-content">
						{!props.disable &&
							props.stores?.map(store => (
								<a
									key={store.value}
									onClick={() => handleSelectedStoreChange(store.value)}
								>
									{store.label}
								</a>
							))}
					</div>
				</div>
			) : (
				<div>
					<button className="dropbtn" disabled={props.disable}>
						{getLabelFromLat(props.label, props.cities)}
					</button>
					<div className="dropdown-content">
						{!props.disable &&
							props.cities?.map(city => (
								<a
									key={city.label}
									onClick={() => handleSelectedCityChange(city.value)}
								>
									{city.label}
								</a>
							))}
					</div>
				</div>
			)}
		</div>
	)
}
