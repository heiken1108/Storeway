import { render } from '@testing-library/react'
import App from '../App'

describe('Snapshot test', () => {
	it('Test if snapshot matches', () => {
		const app = render(<App />)
		expect(app).toMatchSnapshot()
	})
})
