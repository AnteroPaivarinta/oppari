import React, { useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import '../App.css';
import kuva from '../kuva.png';
import '../styles.css';
import axios from 'axios';
import { IAdmin } from '../types';


const Admin = () => {

    const [inputs, setInputs] = useState< IAdmin >
    ({
      user: '',
      password: ''
    });

    const handleChange = (event:any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = () => {
        axios.post("http://localhost:3001/admin", inputs).then((response) => {
            console.log('Post succesful', response);
        });
    }

  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', height: '100vh', backgroundSize: 'cover' }}>
        <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'flex-end', width:'100%', height: '10%', marginLeft: -260}}>
            
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '92%', height: '90%'}}>
          <div style={{marginLeft: '60%'}}>
            <h1 style={{color:'white'}}>Kaleva2024</h1>
            <h2 style={{marginTop: -30}}>Ilmotautuminen</h2>
            <hr></hr>
            <h3 style={{color:'white'}}>
              So far we have looked at the behavior when our flex-direction is row, and while working in a language
              written top to bottom. This means that the main axis runs along the row horizontally, and our cross
              axis alignment moves the items up and down.
            </h3>
          </div>
          <label className='columnLabel'>User:</label>
          <input 
            className='inputStyle'
            type="text" 
            name="user" 
            value={inputs?.user || ""} 
            onChange={handleChange}
          />
            <label className='columnLabel'>Password:</label>
          <input 
            className='inputStyle'
            type="text" 
            name="password" 
            value={inputs?.password || ""} 
            onChange={handleChange}
          />
          <button onClick={() => handleSubmit()}></button>
        </div>
      </div>
  );
}

export default Admin;
