import React, { useEffect, useState } from 'react';
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
    const [logResponse, setLogResponse ] = useState(false);

    const handleChange = (event:any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = () => {
      axios.post("http://localhost:3001/admin", inputs).then((response) => {
          console.log('Post succesful', response);
          if(response.data === 'Right user and password'){
            setLogResponse(true);
          } 
      });
    }

    useEffect(() => {
      
      
    },  []);

  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', height: '100vh', backgroundSize: 'cover' }}>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column',  width: '100%', height: '100%', marginTop: '5%'}}>
          <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
            <label className='columnLabel'>User:</label>
            <input 
              className='inputStyle'
              type="text" 
              name="user" 
              value={inputs?.user || ""} 
              onChange={handleChange}
            />
          </div>
          <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
            <label className='columnLabel'>Password:</label>
            <input 
              className='inputStyle'
              type="text" 
              name="password" 
              value={inputs?.password || ""} 
              onChange={handleChange}
            />
          </div>  
          <button style={{height: '3%', width: '5%', marginTop: '1%'}} onClick={() => handleSubmit()}>Kirjaudu</button>
        </div>
      </div>
    </div>
        
  );
}

export default Admin;
