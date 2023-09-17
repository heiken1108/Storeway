import './Header.css'
import { useNavigate } from 'react-router-dom'

export default function Header() {
	const navigate = useNavigate()

	function handleNavHome() {
		navigate('/')
	}

	return (
		<div className="Header">
			<h1 onClick={() => handleNavHome()}> &#128722; Storeway</h1>
		</div>
	)
}
