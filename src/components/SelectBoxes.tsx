import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
const SelectBoxes = (props: any) => {
  const selectedValues = props.selectedValues.map((value:any) => value.label)
  const options = [
    { value: '1', label: 'Tuomari | Domare'},
    { value: '2', label: 'järjestyksen valvoja (kortillinen)'},
    {value: '3', label: 'järjestys- tai liikennevalvoja (ilman korttia)'},
    {value: '4', label: 'avustaja palkintojen jaossa'},
    {value: '5', label: 'tulospalvelu (atk) '},
    {value: '6', label: 'kisakansliatoimitsija'},
    {value: '7', label: 'Vaatekorin kantaja (väh. 10 v.)'},
    {value: '8', label: 'kioskimyyjä '},
    {value: '9', label: 'VIP-teltan toimitsija'},
    {value: '10', label: 'lipunmyyjä'},
    {value: '11', label: 'rakentamistiimin jäsen (ennen kisoja)'},
    {value: '12', label: 'muu (kerro kommenteissa)'},
  ]
  return (
    <div className='square'>
      <div className='taskDropDown' data-testid='selectionbox'>
      <form data-testid="form">
        <label htmlFor="selectionbox">selectionbox</label>
        <Select inputId="selectionbox" name='selectionbox' options={options.filter((value)=> !selectedValues.includes(value.label))} onChange={(e) =>props.selectHandleChange(e)}   />
      </form>
      </div>
      <div className='taskList'>
        {selectedValues.map((value : string) => 
          <div className='taskSelectedListItem'>
            <div onClick={() => props.remove(value)} style={{alignSelf:'flex-start'}}><FontAwesomeIcon icon={faCircleXmark} color='red '  size='2x'/> </div>
             <div>{value} </div>
            
          </div> ) 
        } 
      </div>
    </div>
  );
}

export default SelectBoxes;
