import { useState } from 'react'
import './ToggleSwitch.css'

interface ToggleSwitchProps {
	onChange: (isChecked: boolean) => void
	defaultChecked?: boolean
}
/**
 * A toggle switch button which is used toggled the pictures of the stores
 * @param onChange the function which is called when the toggle switch is changed
 * @param defaultChecked the default state of the toggle switch
 * @returns a toggle switch button which is used toggled the pictures of the stores
 */
export default function ToggleSwitch({
	onChange,
	defaultChecked = true,
}: ToggleSwitchProps): JSX.Element {
	const [isChecked, setIsChecked] = useState(defaultChecked)

	const handleToggle = () => {
		const newCheckedState = !isChecked
		setIsChecked(newCheckedState)
		onChange(newCheckedState)
	}

	return (
		<div
			onClick={handleToggle}
			className={`toggle-switch ${isChecked ? 'checked' : ''}`}
		>
			<div className="toggle-switch-bottom"></div>
		</div>
	)
}
