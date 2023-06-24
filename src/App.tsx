import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './App.css';
import kuva from './kuva.png';
import './styles.css';
import Registration from './views/Registration';
import Main from './views/Main';


const App =() => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Registration />} />
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
