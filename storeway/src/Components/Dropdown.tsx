import Select from 'react-select';
import './Dropdown.css'

interface IProps {
    stores: IStores[]
    handleStoreChange: (arg0: string) => void
}

interface IStores{
    label: string,
    value: string
}

export default function Dropdown(props: IProps){
    //const [selectedValue, setSelectedValue] = useState("");
    function handleSelectedStoreChange(option: any){
        //setSelectedValue(option.value);
        props.handleStoreChange(option.value);
    }
    return (
        <div className='dropdown'>
            <Select 
                options={props.stores} 
                onChange={handleSelectedStoreChange}
                />
        </div>
    )
}   