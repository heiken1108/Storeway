import { render, fireEvent } from '@testing-library/react'
import Favorite from '../Components/Favorite/Favorite'
import jest from 'jest-mock'

describe('Heart icon test', () => {
	it('State test when clicking on heart icon', () => {
		const handleClick = jest.fn() // Mock handleClick function
		const { getByRole } = render(<Favorite handleClick={handleClick} id="1" />)
		expect(getByRole('heartIcon')).toHaveAttribute('name', 'heart-outline')
		fireEvent.click(getByRole('heartIcon'))
		expect(getByRole('heartIcon')).toHaveAttribute('name', 'heart')
		expect(handleClick).toHaveBeenCalled()
		fireEvent.click(getByRole('heartIcon'))
		expect(getByRole('heartIcon')).toHaveAttribute('name', 'heart-outline')
	})
})
