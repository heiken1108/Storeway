import { render } from '@testing-library/react'
import App from '../App'

test('Header', () => {
	const { getByText } = render(<App />)
	const heading = getByText('🛒 Storeway')
	expect(heading).toBeInTheDocument()
})
