import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import kuva from '../kuva.png';
import { IData } from '../types';
import '../styles.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Select from 'react-select';
import Switch from "react-switch";
import SelectBoxes from '../components/SelectBoxes';


const Registration = () => {
  
  const [inputs, setInputs] = useState < IData >
  ({
    PersonID: '',
    email: '',
    tshirt: 'XS', 
    gender: '', 
    phone: '', 
    freeText:'',
    licenseCard: false,
    firstName:'',
    lastName: '',
    hopes: '',
    team: '',
    age:'',
    tasks: [],
    days: {
      first: false, 
      second: false,
      third: false,
    }
  });

  const [checked, setChecked  ] = useState<boolean>(false);
  const [responseMessage, setLogResponseMessage ] = useState('');
  const [errorMessage, setErrorMessage ] = useState('');
  const [validInputError, setValidInputError ] = useState('');
  const options = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
  ];

  const checkValidInputs  = () => {
    if(inputs.age === '' || inputs.tshirt === '-' || inputs.email === '' || inputs.firstName === '' || inputs.lastName === '' ||
      (inputs.days.first === false && inputs.days.second === false && inputs.days.third === false) || inputs.gender === '' || inputs.tasks.length === 0 || inputs.phone === '') {
        return false;
    } else{
      return true;
    }
  }


  const handleChange = (event:any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const selectHandleChange = (selectedOption:any) => {
    setInputs(values => ({...values, tshirt: selectedOption.value}))
  }

  const handleLicenseCard = (checked:any) => {
    setInputs(values => ({...values, licenseCard: checked}))
  }

  const handleTasks = (e:any) => {

    const tasks = inputs.tasks;
    tasks.push(e);
    setInputs(values => ({...values, tasks: tasks}))

  }

  const handleSubmit = () => {
    if ( !checkValidInputs() ){
      setValidInputError('Tähdellä merkittyjä tekstikenttiä ei ole täytetty. Täytä tarvittavat tekstikentät.')
    } else {
      setValidInputError('')
      let uid = uuid();
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;
      const object = {...inputs, PersonID : uid, date: currentDate};
      
      axios.post("http://localhost:3001/userData", object).then((response) => {
        console.log('Post succesful :)', response);
        setLogResponseMessage('Tietojen lähettäminen onnistui. Voit sulkea ikkunan.')
      }).catch((error) => {
        console.log('Error123', error)
        setErrorMessage('Tietojen lähettäminen epäonnistui. Ota yhteyttä ylläpitäjään..')
      });
    }

  };

  const removeSelectedTask = (taskName: string) => {
    setInputs({...inputs, tasks: inputs.tasks.filter((value)=> taskName != value.label)})
  }
  

  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', maxHeight: '100%', height: '100vh', backgroundSize:'cover' }}>
        <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'flex-end', width:'100%', height: '10%', marginLeft: -260}}>
         
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '90%', alignSelf:'center'}}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Firstname: </label>
              <input 
                data-testid='firstName'
                className='inputStyle'
                type="text" 
                name="firstName" 
                value={inputs?.firstName || ""} 
                onChange={handleChange}
              /> 
              <p className='star'> * </p>
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Email:</label>
              <input
                data-testid='email' 
                className='inputStyle'
                type="text" 
                name="email" 
                value={inputs?.email || ""} 
                onChange={handleChange}
              />
              <p className='star'> * </p>
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Surname:</label>
              <input
                data-testid='lastName' 
                className='inputStyle'
                type="text" 
                name="lastName" 
                value={inputs?.lastName || ""} 
                onChange={handleChange}
              /> 
              <p className='star'> * </p>
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Age:</label>
              <input
                data-testid='age' 
                className='inputStyle'
                type="text" 
                name="age" 
                value={inputs?.age || ""} 
                onChange={handleChange}
              /> 
              <p className='star'> * </p>
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Gender:</label>
              <input
                data-testid='gender' 
                className='inputStyle'
                type="text" 
                name="gender" 
                value={inputs?.gender || ""} 
                onChange={handleChange}
              />   
              <p className='star'> * </p>
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Team:</label>
              <input
                data-testid='team' 
                className='inputStyle'
                type="text" 
                name="team" 
                value={inputs?.team || ""} 
                onChange={handleChange}
              /> 
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>T-Shirt:</label>
                <div>
                  <Select className='inputStyleTshirtTwo' value={{label: inputs.tshirt, value: inputs.tshirt}} options={options}  onChange={(e) => selectHandleChange(e)}   />
                </div>
               <p className='star'> * </p>
            </div> 
           
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Phone:</label>
              <input
                data-testid='phone' 
                className='inputStyle'
                type="text" 
                name="phone" 
                value={inputs?.phone || ""} 
                onChange={handleChange}
              />
                <p className='star'> * </p>
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>License Card:</label>
            
               <Switch data-testid='licenseCard' onChange={handleLicenseCard} checked={inputs.licenseCard} />
               <p style={{color: ' red'}}> * </p>
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Hopes:</label>
              <input
                data-testid='hopes' 
                className='inputStyle'
                type="text" 
                name="hopes" 
                value={inputs?.hopes || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Kisojen osallistumispäivät:</label>
              <input  data-testid='first' type="checkbox" onClick={() => setInputs({...inputs, days: {...inputs.days, first: !inputs.days.first}})} /> <p>28.6.2024</p>
              <input data-testid='second' type="checkbox" onClick={() => setInputs({...inputs, days: {...inputs.days, second: !inputs.days.second}})} /> <p>29.6.2024</p>
              <input data-testid='third' type="checkbox" onClick={() => setInputs({...inputs, days: {...inputs.days, third: !inputs.days.third}})} /> <p>30.6.2024</p>
              <p className='star'> * </p>
            </div>
           
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '40%'}}>
              <label className='columnLabel'> Tasks</label>
              <SelectBoxes selectedValues={inputs.tasks} selectHandleChange={handleTasks} remove={removeSelectedTask} />
              <p className='star'> * </p>
            </div>
           
             <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Free text:</label>
              <textarea
                data-testid='freetextfield'
                name="freeText"
                className='inputStyleFreeText'
                rows={3}
                cols={40}
                onChange={(e) => handleChange(e)}
                value={inputs?.freeText}
              />
            </div>
            <p style={{color:'green'}}> {responseMessage? responseMessage: null}</p>
            {errorMessage? <p data-testid='errorMessage' style={{color:'red'}}> {errorMessage}</p> : null }
            { validInputError ? <p style={{color:'red'}}> {validInputError}</p> : null }
          </form>
          <button type="submit"  onClick={() => handleSubmit()} data-testid='sendButtonTwo' disabled={!checked} > LÄHETÄ </button> 

          <div style={{flexDirection:'row'}}>
            <input data-testid='robotButton' type="checkbox" onClick={() => setChecked(!checked)} /> En ole robotti
          </div>
        </div>
      </div>
  )
};
  
export default Registration;