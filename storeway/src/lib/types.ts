export interface Store {
	address: string
	email: string
	fax: string
	id: number
	name: string
	openingHours: OpeningHours
	phone: string
	position: { lat: string; lng: string }
	website: string
	logo: string
}

export interface OpeningHours {
	monday: string
	tuesday: string
	wednesday: string
	thursday: string
	friday: string
	saturday?: string
	sunday?: string
}

export interface IDropdownStore {
	label: string
	value: string
}

export interface IDropdownCity {
	label: string
	value: { lat: string; lng: string }
}
