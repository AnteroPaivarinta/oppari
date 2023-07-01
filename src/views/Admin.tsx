import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import '../App.css';
import kuva from '../kuva.png';
import '../styles.css';
import axios from 'axios';
import { IAdmin, IData, IDataBoolean, IDataIndex } from '../types';


const Admin = () => {

    const [inputs, setInputs] = useState< IAdmin >
    ({
      user: '',
      password: ''
    });

    const [logResponse, setLogResponse ] = useState(false);
    const [dataBase, setDatabase ] = useState<IData[]>([]);
    const [rowData, setRowData] = useState<IDataIndex[]>([]);
    const [updatedRowData, setUpdatedRowData] = useState<IDataIndex[]>([]);
    
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
        const newRowData: any[] = [];
        response.data.forEach((element: IData, index:number) => {
          newRowData.push({index: index, data:element, update: false })
        });
        setRowData(newRowData);
        setDatabase(response.data);
        setLogResponse(true);
      });
    }

    const onUpdate = (index:number) => {

      const array: IDataIndex[] = rowData;
      array[index] = {...array[index], update: true};
      setUpdatedRowData(array);
    }

    

    const handleChangeUpdate = (event:any, dataObject:IDataIndex) => {
      const name = event.target.name;
      const value = event.target.value;
      const object = {
        index: dataObject.index,
        data: {...dataObject.data, [name] : value},
        update: true,
      };
      let objIndex = rowData.findIndex((obj => obj.index === dataObject.index));
      const array = [...rowData];
      array[objIndex] = object
      setUpdatedRowData(array);
    }

    const onSaveUpdate = (index: number) => {

      const array = updatedRowData.map((object: IDataIndex) => object.update === true? {...object, update: false} : object );
      const ob = array.find((object) => object.index === index);
      axios.put("http://localhost:3001/userData", ob).then((response) => {
        
        console.log('Putsuccesful', response);
      });
      setRowData(array);
    }

    const check = () => {
     
      return rowData.find((value:IDataIndex) => value.update === true) ? true: false;
    }

    const renderTable = () => {
      const mapArray = rowData;
      const array = mapArray.map((value:IDataIndex, index:number ) => 
        <tr key={index.toString()}>
          <td> {value.update ? <input className='smallInput' name='firstName' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.firstName } </td> 
          <td> {value.update ? <input className='smallInput' name='lastName' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.lastName } </td> 
          <td> {value.update ? <input className='smallInput' name='age' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.age } </td> 
          <td> {value.update ? <input className='smallInput' name='email' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.email } </td> 
          <td> {value.update ? <input className='smallInput' name='gender' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.gender } </td> 
          <td> {value.update ? <input className='smallInput' name='phone' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.phone } </td> 
          <td> {value.update ? <input className='smallInput' name='tshirt' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.tshirt } </td> 
          <td> {value.update ? <input className='smallInput' name='team' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.team } </td> 
          <td> {value.update ? <input className='smallInput' name='hopes' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.hopes } </td> 
          <td> {value.update ? <input className='smallInput' name='freeText' onChange={(e) => handleChangeUpdate(e, value)}/> : value.data.freeText } </td> 
          { !value.update && <button onClick={() => onDelete(value.data.PersonID)}> DELETE</button>}
          { !value.update ?<button onClick={() => onUpdate(value.index)}> UPDATE</button> :  <div style={{flexDirection: 'row', display: 'flex'}}> <button onClick={() => onSaveUpdate(index)}>Save</button><button>Cancel</button></div>}
        </tr>
      )
      return (array)
    }

    useEffect(() => {
      console.log('logresponse', logResponse)
      if(logResponse === true) {
        axios.get("http://localhost:3001/userData")
        .then(function (response) {
          const array = response.data;
          const newRowData: any[] = [];
          array.forEach((element: IData, index:number) => {
            newRowData.push({index: index, data:element, update: false })
          });
          setRowData(newRowData);
          setDatabase(response.data);
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
        { logResponse && 
          <div style={{justifyContent: 'center', display: 'flex', justifyItems:'center', width: '60%'}}> 
            <table>
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
          </table>
          
          </div>}

        </div>
      </div>
    </div>
        
  );
}

export default Admin;
