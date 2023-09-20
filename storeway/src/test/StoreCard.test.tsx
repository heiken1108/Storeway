import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import StoreCard from '../Components/StoreCard/StoreCard'
import { expect } from 'vitest'

describe('StoreCard test', () => {
	it('Storecard test when showLogo is true', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route
						path="/"
						element={
							<StoreCard
								logoSource={
									'https://cdn.kassal.app/7d38508b-65d3-4fdb-a259-ee49db95b55c/logos/Meny.svg'
								}
								name={'MENY Manglerud'}
								id={'1'}
								showLogo={true}
							/>
						}
					/>
				</Routes>
			</MemoryRouter>,
		)

		//Teste om storecard har fått riktig tittel
		const name = screen.getByRole('nameItem')
		const name2 = screen.getByText('MENY Manglerud')
		expect(name == name2)
		expect(name.textContent).toBe('MENY Manglerud')

		//Teste om storecard har riktig logo
		const img = screen.getByRole('imgItem')
		const imgsrc = img.getAttribute('src')
		expect(imgsrc).toBe(
			'https://cdn.kassal.app/7d38508b-65d3-4fdb-a259-ee49db95b55c/logos/Meny.svg',
		)
	})

	it('Storecard test when showLogo is false', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route
						path="/"
						element={
							<StoreCard
								logoSource={
									'https://cdn.kassal.app/7d38508b-65d3-4fdb-a259-ee49db95b55c/logos/Meny.svg'
								}
								name={'MENY Manglerud'}
								id={'1'}
								showLogo={false}
							/>
						}
					/>
				</Routes>
			</MemoryRouter>,
		)

		//Teste om storecard har fått riktig tittel
		const name = screen.getByRole('nameItem')
		const name2 = screen.getByText('MENY Manglerud')
		expect(name == name2)
		expect(name.textContent).toBe('MENY Manglerud')

		//Teste om storecard har riktig logo
		// expect(screen.getByRole('imgItem')).toBe(null)
		const img = screen.queryByRole('imgItem')
		expect(img).toBe(null)
	})
})
