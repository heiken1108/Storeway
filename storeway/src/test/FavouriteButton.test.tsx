import { fireEvent, render, screen } from '@testing-library/react'
import StandardButton from '../Components/Button/StandardButton'
import { expect } from 'vitest'
import jest from 'jest-mock'

function handleClick() {
	console.log('Button clicked')
}

describe('FavouriteButton test', () => {
	it('Test if StandardButton renders', () => {
		render(
			<StandardButton
				handleClick={handleClick}
				state={false}
				text="Favoritter"
			/>,
		)
		const standard = screen.getByRole('standardButton')
		expect(standard.className).toBe('standardButton')
		expect(standard).toBeInTheDocument()
	})
	it('Test if Standardbutton function gets called when clicked', () => {
		render(
			<StandardButton
				handleClick={handleClick}
				state={true}
				text="FavorittKnapp"
			/>,
		)
		const favourite = screen.getByText('FavorittKnapp')
		expect(favourite).toBeInTheDocument()
		expect(favourite.className).toBe('favouriteButton')
		console.log = jest.fn()
		fireEvent.click(favourite)
		expect(console.log).toHaveBeenCalledWith('Button clicked')
	})
})
