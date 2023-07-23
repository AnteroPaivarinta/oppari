import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCircleXmark} from '@fortawesome/free-solid-svg-icons'
const SelectBoxes = (props: any) => {
  const selectedValues = props.selectedValues.map((value:any) => value.label)
  // 
  console.log('SELE', selectedValues)
  const options = [
    { value: '1', label: 'Kenttälajin toimitsja (kokenut)' },
    { value: '2', label: 'Kenttälajin toimitsija (ei kokemusta)' },
    { value: '3', label: 'järjestyksen valvoja (kortillinen)'},
    {value: '4', label: 'järjestys- tai liikennevalvoja (ilman korttia)'},
    {value: '5', label: 'avustaja palkintojen jaossa'},
    {value: '6', label: 'tulospalvelu (atk) '},
    {value: '7', label: 'kisakansliatoimitsija'},
    {value: '8', label: 'Vaatekorin kantaja (väh. 10 v.)'},
    {value: '9', label: 'kioskimyyjä '},
    {value: '10', label: 'VIP-teltan toimitsija'},
    {value: '11', label: 'lipunmyyjä'},
    {value: '12', label: 'rakentamistiimin jäsen (ennen kisoja)'},
    {value: '13', label: 'muu (kerro kommenteissa)'},
  ]
  return (
    <div className='square'>
      <div className='taskDropDown'>
        <Select options={options.filter((value)=> !selectedValues.includes(value.label))}  onChange={(e) =>props.selectHandleChange(e)}   />
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
