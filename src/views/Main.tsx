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
            
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '92%', height: '90%'}}>
          <div style={{marginLeft: '60%'}}>
            <h1 style={{color:'white'}}>Kalevan kisat 2024</h1>
            <h2 style={{marginTop: -30}}> Ilmoittautuminen | Anmälan</h2>
            <hr></hr>
            <h3 style={{color:'white'}}>
            "Ilmoittaudu tässä Vaasan 2024 Kalevan kisojen vapaaehtoiseksi toimitsijaksi. Saat kuittauksen ilmoittautumisesta annettuun sähköpostiin. Otamme sinuun yhteyttä. Tervetuloa mukaan! | Här anmäler Du dig som frivillig funktionär till Kalevan kisat 2024 i Vasa. Du får en kvittering på gjord anmälan till den epost som angivits. Vi kontaktar Dig. Välkommen med!
            </h3>
            <button>
              <NavLink
                  to="/registration"
              >
                <h5 style={{margin: 5}}>Ilmoittaudu</h5>
              </NavLink>
            </button>
           
          </div>
        </div>
      </div>
  );
}

export default Main;
