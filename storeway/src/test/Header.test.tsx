import { render } from '@testing-library/react'
import App from '../App'

describe('Header test', () => {
	it('Test if Header renders', () => {
		const { getByText } = render(<App />)
		const heading = getByText('🛒 Storeway')
		expect(heading).toBeInTheDocument()
	})
})
