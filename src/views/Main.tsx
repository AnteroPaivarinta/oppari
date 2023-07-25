import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import '../App.css';
import kuva from '../kuva.png';
import '../styles.css';


const Main = () => {
  return (
    <div style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', height: '100vh', backgroundSize: 'cover' }}>
        <div style={{ display:'flex', flexDirection: 'row', justifyContent: 'flex-end', width:'100%', height: '10%', marginLeft: -260}}>
            <NavLink
              to="/admin"
            >
              <h5 style={{margin: 5}}> Admin</h5>
            </NavLink>
            <NavLink
                to="/registration"
            >
              <h5 style={{margin: 5}}>Ilmoittaudu</h5>
            </NavLink>
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
        </div>
      </div>
  );
}

export default Main;
