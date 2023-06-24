import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import kuva from '../kuva.png';
import { IData } from '../types';


const Registration = () => {

  const [inputs, setInputs] = useState< IData >
  ({
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
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '92%', height: '90%'}}>
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%', alignItems: 'center'}}>
      <div style={{display: 'flex', flexDirection:  'row'}}>
        <label style={{width: '27%', height: '10%'}}> Firstname:   </label>
        <input 
          style={{  
            width: '73%',
            height:'5%',
            padding: 12,
            borderStyle: 'solid',
            borderRadius: 4,
            resize: 'vertical'
          }}
          type="text" 
          name="firstName" 
          value={inputs?.firstName || ""} 
          onChange={handleChange}
        />
      </div>
      
      <div style={{display: 'flex', flexDirection:  'row', justifyContent: 'flex-start'}}>
        <label  style={{width: '27%', height: '5%'}}>Surname:  </label>
        <input 
          style={{  
            width: '73%',
            height:'5%',
            padding: 12,
            borderStyle: 'solid',
            borderRadius: 4,
            resize: 'vertical'
          }}
          type="number" 
          name="age" 
          value={inputs?.age || ""} 
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