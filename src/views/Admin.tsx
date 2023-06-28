import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import '../App.css';
import kuva from '../kuva.png';
import '../styles.css';
import axios from 'axios';
import { IAdmin, IData } from '../types';


const Admin = () => {

    const [inputs, setInputs] = useState< IAdmin >
    ({
      user: '',
      password: ''
    });
    const [logResponse, setLogResponse ] = useState(false);
    const [dataBase, setDatabase ] = useState<IData[]>([]);
    
    const handleChange = (event:any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = () => {
      setLogResponse(true);
      axios.post("http://localhost:3001/admin", inputs).then((response) => {

          console.log('Post succesful', response);
          if(response.data === 'Right user and password'){
            setLogResponse(true);
          } 
      });
    }

    const onDelete = (index: string) => {
      axios.delete("http://localhost:3001/delete/"+index).then((response) => {
          console.log('Delete succesful', response);
          
      });
    }

    const onUpdate = () => {

    }

    const renderTable = () => {
      const array = dataBase.map((value:IData, index:number ) => 
        <tr key={index.toString()}>
          <td>{value.firstName}</td>
          <td>{value.lastName}</td>
          <td>{value.age}</td>
          <td>{value.email}</td>
          <td>{value.gender}</td>
          <td>{value.phone}</td>
          <td>{value.tshirt}</td>
          <td>{value.team}</td>
          <td>{value.hopes}</td>
          <td>{value.freeText}</td>
          <button onClick={() => onDelete(value.PersonID)}>DELETE</button>
          <button>UPDATE</button>
        </tr>
      )
      return (array)
    }

    useEffect(() => {
      console.log('logresponse', logResponse)
      if(logResponse === true) {
        axios.get("http://localhost:3001/userData")
        .then(function (response) {
          console.log(response);
          
          setDatabase(response.data)
        });
      }
    }, [logResponse]);

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
         
          <button style={{height: '3%', width: '5%', marginTop: '1%'}} onClick={handleSubmit}>Kirjaudu</button>
        { logResponse &&<table>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>T-shirt</th>
            <th>Team</th>
            <th>Hopes</th>
            <th>Free text</th>
          </tr>
          {renderTable()}
        </table>}

        </div>
      </div>
    </div>
        
  );
}

export default Admin;
