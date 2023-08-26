import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import kuva from '../kuva.png';
import { IData, ITaskOption } from '../types';
import '../styles.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Select from 'react-select';
import Switch from "react-switch";
import Tasks from '../components/tasks';
import ConfirmModal from '../components/Modal';
import validator from 'validator';
import isEmail from 'validator/lib/isEmail';


const Registration = () => {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [inputs, setInputs] = useState < IData >
  ({
    PersonID: '',
    email: '',
    tshirt: 'M', 
    gender: '', 
    phone: '', 
    freeText:'',
    licenseCard: false,
    firstName:'',
    lastName: '',
    hopes: '',
    team: '',
    age:'',
    tasks:{
      firstTask: false,
      secondTask: false,
      thirdTask: false,
      fourthTask: false,
      fifthTask: false,
      sixthTask: false,
      seventhTask:false,
      eightTask: false,
      ninthTask: false,
      tenthTask: false,
      eleventhTask: false,
      other: false,
    },
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
  const [showModal, setShowModal] = useState(false);
  
  const ip =  '13.51.169.250';
  const options = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
  ];

  const checkValidInputs  = () => {
    function checkEntries  (arr:any)  {
      return arr.find((value:any) => value[1] === false) ? true : false
    }
    if( inputs.age === '' ||
      inputs.tshirt === '-' ||
      inputs.email === '' ||
      inputs.firstName === '' ||
      inputs.lastName === '' ||
      (inputs.days.first === false && inputs.days.second === false && inputs.days.third === false) ||
      inputs.gender === ''|| 
      inputs.phone === '' || 
      isEmail(inputs.email) === false ||
      Object.entries(inputs.tasks).every(checkEntries) === true)  {
        return false;
      } else {
        return true;
    }
  }



  const tasksCheckBoxes = () => {
    return Tasks.map((ob:ITaskOption)  => {
      return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <input style={{width: 10, height: 10}} data-testid='first' type="checkbox" onClick={() =>
             setInputs({...inputs, tasks: {...inputs.tasks, [ob.value]: !{...inputs.tasks}[ob.value]}})} 
          />
          <p className='taskLabel'>{ob.label}</p>
        </div>
      )
    })
    
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

 

  const handleSubmit = () => {
    if ( !checkValidInputs() ){
      setValidInputError('Tähdellä merkittyjä tekstikenttiä ei ole täytetty. Täytä tarvittavat tekstikentät.')
    } else {
      setValidInputError('')
      const array: string[] = [];
      let uid = uuid();
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;
      for (const [key, value] of Object.entries(inputs.tasks)) {
        console.log('VALUE', value, 'KEY', key)
        if ( value === true) {
          const taskItem = Tasks.find((ob) => ob.value === key);
          if (taskItem) {
            console.log('HEWEWEGO', taskItem.label)
            array.push(taskItem?.label)
          }
        }
      }
      console.log('ARRAY', array);
      const object = {...inputs, PersonID : uid, date: currentDate, tasks: array};
    
      axios.post(`https://${ip}/userData`, object).then((response) => {
        console.log('Post succesful :)', response);
        setShowModal(true);
        setLogResponseMessage('Kiitos ilmoittautumisestisi - Otamme sinuun yhteyttä | Tack för anmälan - Vi kontaktar Dig senare!')
      }).catch((error) => {
        console.log('Error123', error)
        setErrorMessage('Tietojen lähettäminen epäonnistui. Ota yhteyttä ylläpitäjään..')
      });
    }

  };

  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat' , maxHeight: screenHeight,  minHeight: screenHeight , height: '100vh', backgroundSize: '100% 100%',  width: '100vw' }}>
        
        { !showModal ? <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '90%', alignSelf:'center'}}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'>Etunimi | Förnamn *</label>
              <input 
                data-testid='firstName'
                className='inputStyle'
                type="text" 
                name="firstName" 
                value={inputs?.firstName || ""} 
                onChange={handleChange}
              /> 
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'>Sukunimi | Efternamn * </label>
              <input
                data-testid='lastName' 
                className='inputStyle'
                type="text" 
                name="lastName" 
                value={inputs?.lastName || ""} 
                onChange={handleChange}
              /> 
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'> Sposti | Epost *</label>
              <input
                data-testid='email' 
                className='inputStyle'
                type="text" 
                name="email" 
                value={inputs?.email || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'>Ikä | Ålder *</label>
              <input
                data-testid='age' 
                className='inputStyle'
                type="text" 
                name="age" 
                value={inputs?.age || ""} 
                onChange={handleChange}
              /> 
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'>Sukupuoli | Kön *</label>
              <input
                data-testid='gender' 
                className='inputStyle'
                type="text" 
                name="gender" 
                value={inputs?.gender || ""} 
                onChange={handleChange}
              />   
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'> Seura | Förening </label>
              <input
                data-testid='team' 
                className='inputStyle'
                type="text" 
                name="team" 
                value={inputs?.team || ""} 
                onChange={handleChange}
              /> 
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'>Puhelin | Telefon *</label>
              <input
                data-testid='phone' 
                className='inputStyle'
                type="text" 
                name="phone" 
                value={inputs?.phone || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'>Unisex koko/storlek *</label>
                <div>
                  <Select className='inputStyleTshirtTwo' value={{label: inputs.tshirt, value: inputs.tshirt}} options={options}  onChange={(e) => selectHandleChange(e)}   />
                </div>
            </div> 
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '25%'}}>
              <label className='columnLabel'>Onko sinulla toimitsijakortti? | Har du domarkort? *</label>
            
               <Switch data-testid='licenseCard' onChange={handleLicenseCard} checked={inputs.licenseCard} />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '40%'}}>
              <label className='columnLabel'>Tehtävätoivomus | Önskemål angående uppgift *</label>
              <div className='taskList'>
                { tasksCheckBoxes() }
              </div>
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '100%', height: '5%'}}>
              <label className='columnLabel'> Mitkä päivät olet kätettävissä | Vilka dagar kan Du ställa upp *</label>
              <input  data-testid='first' type="checkbox" onClick={() => setInputs({...inputs, days: {...inputs.days, first: !inputs.days.first}})} /> <p className='dayLabel'>28.6.2024</p>
              <input data-testid='second' type="checkbox" onClick={() => setInputs({...inputs, days: {...inputs.days, second: !inputs.days.second}})} /> <p className='dayLabel'>29.6.2024</p>
              <input data-testid='third' type="checkbox" onClick={() => setInputs({...inputs, days: {...inputs.days, third: !inputs.days.third}})} /> <p className='dayLabel'>30.6.2024</p>
            </div>
             <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Vapaat kommentit | Fria kommentarer *</label>
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
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
            <button type="submit"  onClick={() => handleSubmit()} data-testid='sendButtonTwo' disabled={!checked} > LÄHETÄ </button> 
            <div style={{flexDirection:'row', display: 'flex'}}>
              <input data-testid='robotButton' type="checkbox" onClick={() => setChecked(!checked)} /> <div style={{color: 'white'}}>En ole robotti</div>
            </div>
          </div>
        </div> : ConfirmModal() }
      </div>
  )
};
  
export default Registration;