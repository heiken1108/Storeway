import Select from 'react-select';
import './Dropdown.css'
import { IDropdownCity, IDropdownStore } from '../../lib/types';
import { getLabelFromLat, getLabelFromValue } from '../../data/Dropdown';

interface IProps {
    stores?: IDropdownStore[]
    cities?: IDropdownCity[]
    type: string
    handleStoreChange?: (arg0: string) => void
    handleCityChange?: (arg0: string) => void
    label: string | null
}

export default function Dropdown(props: IProps){
    function handleSelectedStoreChange(option: any){
        if (props.handleStoreChange){
            props.handleStoreChange(option.value);
        }
    }

    function handleSelectedCityChange(option: any){
        if (props.handleCityChange){
            props.handleCityChange(option.value);
        }
    }
    
    return (
        <div className='dropdown'>
            {props.type == "store" ? (
                <Select 
                    options={props.stores} 
                    onChange={handleSelectedStoreChange}
                    placeholder={getLabelFromValue(props.label, props.stores)}
                />
            ):(
                <Select 
                    options={props.cities} 
                    onChange={handleSelectedCityChange}
                    placeholder={getLabelFromLat(props.label, props.cities)}
                />
            )}
        </div>
    )
}   