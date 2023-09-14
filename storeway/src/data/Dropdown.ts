import { IDropdownCity, IDropdownStore } from "../lib/types";

export const StoresDropdown: IDropdownStore[] = [
    {value: '', label: '-'},
    {value: 'BUNNPRIS', label: 'Bunnpris'},
    {value: 'COOP_EXTRA', label: 'Coop Extra'},
    {value: 'COOP_OBS', label: 'Coop Obs'},
    {value: 'JOKER_NO', label: 'Joker'},
    {value: 'KIWI', label: 'Kiwi'},
    {value: 'MENY_NO', label: 'Meny'},
    {value: 'REMA_1000', label: 'Rema 1000'},
]

export const CitiesDropdown: IDropdownCity[] = [
    {value: {lat: '', lng: ''}, label: '-'},
    {value: {lat: '59.930004', lng: '10.782659'}, label: 'Oslo'},
    {value: {lat: '63.427358', lng: '10.395770'}, label: 'Trondheim'},
    {value: {lat: '62.464546', lng: '6.2645294'}, label: 'Ålesund'},
    {value: {lat: '60.385821', lng: '5.3329938'}, label: 'Bergen'},
    {value: {lat: '59.433756', lng: '10.662886'}, label: 'Moss'},
    {value: {lat: '59.746106', lng: '10.187826'}, label: 'Drammen'},
]

export function getLabelFromValue(valueToFind: string | null, dropdownOptions: IDropdownStore[] | undefined) {
    if (dropdownOptions && valueToFind){
        const selectedOption = dropdownOptions.find(option => option.value === valueToFind);
        return selectedOption ? selectedOption.label : null;
    }
    return "Velg by"
}

export function getLabelFromLat(latToFind: string | null, dropdownOptions: IDropdownCity[] | undefined){
    if (dropdownOptions && latToFind){
        const selectedOption = dropdownOptions.find(option => option.value.lat === latToFind);
        return selectedOption ? selectedOption.label : null;
    }
    return "Velg sted"
}