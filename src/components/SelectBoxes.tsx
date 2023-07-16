import makeAnimated from 'react-select/animated';
import Select from 'react-select';

const SelectBoxes = (props: any) => {
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
        {value: '13', label: 'muu (kerro kommenteissa)'},]
    
  return (
    <div>
        <Select onChange={(e) =>props.selectHandleChange(e)} options={options} components={makeAnimated()} isMulti />
    </div>
  );
}

export default SelectBoxes;
