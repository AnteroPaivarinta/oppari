import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import kuva from '../kuva.png';
import { IData } from '../types';
import '../styles.css';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
const Registration = () => {
  
  const [inputs, setInputs] = useState < IData >
  ({
    PersonID: '',
    email: '',
    tshirt: '', 
    gender: '', 
    phone: '', 
    freeText:'',
    licenseCard: '',
    firstName:'',
    lastName: '',
    hopes: '',
    team: '',
    age:''
  });

  const handleChange = (event:any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(inputs);
    let uid = uuid();
    console.log('UID', uid);
    const object = {...inputs, PersonID : uid};
    axios.post("http://localhost:3001/userData", object).then((response) => {
      console.log('Post succesful', response);
    });
  }

  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', height: '100vh', backgroundSize:'cover' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '90%'}}>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'> Firstname: </label>
              <input 
                className='inputStyle'
                type="text" 
                name="firstName" 
                value={inputs?.firstName || ""} 
                onChange={handleChange}
              />
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>Surname:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="lastName" 
                value={inputs?.lastName || ""} 
                onChange={handleChange}
              />
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>Age:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="age" 
                value={inputs?.age || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>Gender:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="gender" 
                value={inputs?.gender || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>Team:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="team" 
                value={inputs?.team || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>T-Shirt:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="tshirt" 
                value={inputs?.tshirt || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>Free text:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="freeText" 
                value={inputs?.freeText || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>Phone:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="phone" 
                value={inputs?.phone || ""} 
                onChange={handleChange}
              />
            </div>

            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'>License Card:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="licenseCard" 
                value={inputs?.licenseCard || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'> Hopes:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="hopes" 
                value={inputs?.hopes || ""} 
                onChange={handleChange}
              />
            </div>
            <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
              <label className='columnLabel'> Email:</label>
              <input 
                className='inputStyle'
                type="text" 
                name="email" 
                value={inputs?.email || ""} 
                onChange={handleChange}
              />
            </div>
            <input type="submit" />
          </form>
        </div>
      </div>
  )
};
  
export default Registration;