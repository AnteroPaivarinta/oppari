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
    tshirt: '', 
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
  });

  const [checked, setChecked  ] = useState<boolean>(false);

  const options = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' },
  ];


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

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(inputs);
    let uid = uuid();
    console.log('UID', uid);
      
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    const object = {...inputs, PersonID : uid, date: currentDate};
  
    axios.post("http://localhost:3001/userData", object).then((response) => {
      console.log('Post succesful', response);
    });
  };

  const removeSelectedTask = (taskName: string) => {
    setInputs({...inputs, tasks: inputs.tasks.filter((value)=> taskName != value.label)})
  }

 
  
  

  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', maxHeight: '100%', height: '100vh', backgroundSize:'cover' }}>
        <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'flex-end', width:'100%', height: '10%', marginLeft: -260}}>
          <NavLink
            to="/"
          >
            <h5 style={{margin: 5}}> Kirjaudu</h5>
          </NavLink>
          <NavLink
            to="/"
          >
            <h5 style={{margin: 5}}>Ilmoittaudu</h5>
          </NavLink>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '90%', alignSelf:'center'}}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Firstname: </label>
              <input 
                className='inputStyle'
                type="text" 
                name="firstName" 
                value={inputs?.firstName || ""} 
                onChange={handleChange}
              />
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Surname:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="lastName" 
                value={inputs?.lastName || ""} 
                onChange={handleChange}
              />
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Age:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="age" 
                value={inputs?.age || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Gender:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="gender" 
                value={inputs?.gender || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Team:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="team" 
                value={inputs?.team || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>T-Shirt:</label>
               <Select value={{label: inputs.tshirt, value: inputs.tshirt}} options={options}  onChange={(e) => selectHandleChange(e)}   />
            </div>
           
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Phone:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="phone" 
                value={inputs?.phone || ""} 
                onChange={handleChange}
              />
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>License Card:</label>
            
               <Switch onChange={handleLicenseCard} checked={inputs.licenseCard} />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Hopes:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="hopes" 
                value={inputs?.hopes || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'> Email:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="email" 
                value={inputs?.email || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '40%'}}>
              <label className='columnLabel'> Tasks</label>
              <SelectBoxes selectedValues={inputs.tasks} selectHandleChange={handleTasks} remove={removeSelectedTask} />
            </div>
           
             <div style={{display: 'flex', flexDirection:  'row', width: '60%', height: '5%'}}>
              <label className='columnLabel'>Free text:</label>
              <textarea
                name="freeText"
                className='inputStyleFreeText'
                rows={3}
                cols={40}
                onChange={(e) => handleChange(e)}
                value={inputs?.freeText}
              />
            </div>
            <input type='submit' disabled={!checked} value='Lähetä'/>
          </form>
          <div style={{flexDirection:'row'}}>
            <input type="checkbox" onClick={() => setChecked(!checked)} /> En ole robotti
          </div>
        </div>
      </div>
  )
};
  
export default Registration;