import Dropdown from '../Components/Dropwdown/Dropdown'
import { render, screen, fireEvent } from '@testing-library/react'
import { CitiesDropdown, StoresDropdown } from '../data/Dropdown'

describe('Dropdown test', () => {
	it('StoreDropdown render test', () => {
		render(<Dropdown stores={StoresDropdown} type={'store'} label={null} />)
		const dropdown = screen.getByRole('dropdown')

		expect(dropdown).toBeInTheDocument()
	})
	it('LocationDropdown render test', () => {
		render(<Dropdown cities={CitiesDropdown} type={'city'} label={null} />)
		const dropdown = screen.getByRole('dropdown')

		expect(dropdown).toBeInTheDocument()
	})
	it('Value and label change for StoreDropdown', () => {
		let value = ''
		const { getByRole } = render(
			<Dropdown
				stores={StoresDropdown}
				handleStoreChange={handleStoreChange}
				type={'store'}
				label={null}
			/>,
		)
		const dropdownButton = getByRole('dropdown')
		fireEvent.click(dropdownButton)
		const bunnprisOption = screen.getByText('Bunnpris')
		fireEvent.click(bunnprisOption)
		expect(value).toBe('BUNNPRIS')

		function handleStoreChange(arg0: string): void {
			value = arg0
		}
	})
	it('Value and label change for LocationDropdown', () => {
		let value = { lat: '', lng: '' }
		const { getByRole } = render(
			<Dropdown
				cities={CitiesDropdown}
				handleCityChange={handleCityChange}
				type={'city'}
				label={null}
			/>,
		)
		const dropdownButton = getByRole('dropdown')
		fireEvent.click(dropdownButton)
		const osloOption = screen.getByText('Oslo')
		fireEvent.click(osloOption)
		expect(screen.getByRole('dropdown')).toHaveTextContent('Oslo')
		expect(value.lat).toBe((value.lat = '59.930004'))
		expect(value.lng).toBe((value.lng = '10.782659'))

		function handleCityChange(arg0: { lat: string; lng: string }): void {
			value = arg0
		}
	})
})
