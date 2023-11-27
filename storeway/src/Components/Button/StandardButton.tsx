import './StandardButton.css'

interface IProps {
	text: string
	state: boolean
	handleClick: () => void
}
/**
 * A standard button used for various purposes
 * @param props consisting of text, state and handleClick
 * @returns a standard ui button used for various purposes
 */
export default function StandardButton(props: IProps) {
	return (
		<button
			role="standardButton"
			className={props.state == false ? 'standardButton' : 'favouriteButton'}
			onClick={props.handleClick}
		>
			{props.text}
		</button>
	)
}
