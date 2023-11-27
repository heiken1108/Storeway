import './LoadingAnimation.css'
/**
 * This component is a loading animation for when data is loading
 * @returns a loading animation
 */
export default function LoadingAnimation() {
	return (
		<div className="lds-default">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}
