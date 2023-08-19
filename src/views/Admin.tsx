import { useEffect, useState } from 'react';
import '../App.css';
import kuva from '../kuva.png';
import '../styles.css';
import axios from 'axios';
import { IAdmin, IAdminObject, IData, IDataIndex } from '../types';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

const Admin = () => {
    const ip =  '172.31.36.167';
    const [inputs, setInputs] = useState< IAdmin >
    ({
      user: '',
      password: ''
    });

    const [logResponse, setLogResponse ] = useState(false);
    const [rowData, setRowData] = useState<IDataIndex[]>([]);
    const [updatedRowData, setUpdatedRowData] = useState<IDataIndex[]>([]);
    const [inputCode, setInpuCode] = useState<string>('');
    const [inputVerify, setInputVerify] = useState<boolean>(false);
    const [adiminObject, setAdminObject ] = useState<IAdminObject>({inputVerify: false, token:'', loginResponse: false});
    const [filterInput, setFiterInput] = useState<string>('');

    const handleChange = (event:any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = () => {
      axios.post(`http://${ip}/admin`, inputs).then((response) => {
        
        console.log('Post succesful', response);
        if(response.data.loginResponse === 'Right user and password'){
          setInputVerify(true);
        } 
      });
    }

    const sendVerifyCode = () => {
      axios.post(`http://${ip}/admin/verify`, inputCode).then((response) => {
        
        console.log('Post succesful', response);
        if(response.data.token){
          setAdminObject({inputVerify: false, token: response.data.token, loginResponse: true})
          setInputVerify(false);
        } 
      });
    }

    const makeExcel = async() => {
    
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('My Sheet2');
      ws.addRow(['PersonID', 'First Name', 'Lastname', 'Gender', 'T-shirt', 'License Card', 'hopes', 'team', 'freeText', 'date']);
      rowData.forEach((el:IDataIndex)=> {
        const arr =  [el.data.PersonID, el.data.firstName, el.data.lastName, el.data.gender, el.data.tshirt, el.data.licenseCard, el.data.hopes, el.data.team, el.data.freeText, el.data.date]
        ws.addRow(arr);
      })
    
      wb.xlsx.writeBuffer()
        .then(buffer => FileSaver.saveAs(new Blob([buffer]), `TIEDOSTO.xlsx`))
        .catch(err => console.log('Error writing excel export', err))
    }
    
    const onDelete = (PersonID: string, i: number) => {
      axios.delete(`http://${ip}/delete/`+PersonID).then((response) => {
        const newRowData: any[] = [];
        response.data.forEach((element: IData, index:number) => {
          newRowData.push({index: index, data:element, update: false, deleting: false})
        });
        setLogResponse(true);
        setRowData(newRowData);
      });
    }

    const onUpdate = (index:number) => {

      const array: IDataIndex[] = rowData;
      array[index] = {...array[index], update: true};
      setUpdatedRowData(array);
    }

    const onCancel = (index:number) => {

      const array: IDataIndex[] = rowData;
      array[index] = {...array[index], update: false};
      setUpdatedRowData(array);
    }

    const handleChangeUpdate = (event:any, index:number) => {

      const name = event.target.name;
      const value = event.target.value;
      const dataObject = updatedRowData.find((value) => value.index === index);
      const array =  [...updatedRowData];
      
      if(dataObject){
        let object = {
          index: dataObject?.index,
          data: {...dataObject?.data, [name] : value},
          update: true,
          deleting: false,
        };
        array[index] = object;
        setUpdatedRowData(array);
      }
    }

    const onSaveUpdate = (index: number) => {

      const array = updatedRowData.map((object: IDataIndex) => object.update === true? {...object, update: false} : object );
      const ob = array.find((object) => object.index === index);
      axios.put(`http://${ip}/userData`, ob).then((response) => {
        
        console.log('Putsuccesful', response);
      });
      setRowData(array);
    };

    const deletingWarning = (index: number) => {
      const array: IDataIndex[] = rowData;
      array[index] = {...array[index], deleting: true};
      setUpdatedRowData(array);
    }


    const renderTable = () => {
      const mapArray = filterInput ? rowData.filter((value:IDataIndex) => value.data.lastName.includes(filterInput)) : rowData;
      const array = mapArray.map((value: IDataIndex, index:number ) => 
        <tr key={index.toString()}>
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.firstName} name='firstName' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.firstName } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.lastName} name='lastName' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.lastName } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.age} name='age' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.age } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.email} name='email' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.email } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.gender} name='gender' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.gender } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.phone} name='phone' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.phone } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.tshirt} name='tshirt' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.tshirt } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.team} name='team' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.team } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.hopes} name='hopes' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.hopes } </td> 
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.freeText} name='freeText' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.freeText } </td>
          <td> {value.update ? <input className='smallInput' value = {updatedRowData[index].data.date} name='date' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.date } </td>  
          { !value.update &&
            <div>
              { !value.deleting ?
                <button data-testid='deleteButton' onClick={() => deletingWarning(index)}> DELETE</button> : 
                <div>
                  <button data-testid='acceptDelete' onClick={() => onDelete(value.data.PersonID, index)}>Kyllä</button> 
                  <button>Ei</button> 
                </div>}
            </div> 
          }
          { !value.update ? <button data-testid='updateButton' onClick={() => onUpdate(value.index)}> UPDATE</button> :  <div style={{flexDirection: 'row', display: 'flex'}}> <button data-testid='updateButtonSave' onClick={() => onSaveUpdate(index)}>Save</button><button onClick={() => onCancel(index)}>Cancel</button></div>}
        </tr>
      )
      return (array)
    }

    useEffect(() => {
      const config = {
        headers: {
           Authorization: "Bearer " + adiminObject.token
        }
      }

      if(adiminObject.loginResponse === true) {
        console.log('ONNISTUTTIIN')
        axios.get(`http://${ip}/userData`, config)
        .then(function (response) {
          const array = response.data;
          console.log('ARRAY', array)
          const newRowData: any[] = [];
          array.forEach((element: IData, index:number) => {
            newRowData.push({index: index, data:element, update: false })
          });
          setRowData(newRowData);
        });
      }
    }, [logResponse, adiminObject]);

 

  return (
    <div data-testid='Admin' style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', height: '100vh', backgroundSize: 'cover' }}>
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column',  width: '100%', height: '100%', marginTop: '5%'}}>
          <div style={{display: 'flex', flexDirection:  'row', width: '40%', height: '5%'}}>
            <label className='columnLabel'>User:</label>
            <input
              data-testid='user' 
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
              data-testid='password'  
              className='inputStyle'
              type="text" 
              name="password" 
              value={inputs?.password || ""} 
              onChange={handleChange}
            />
          </div>  
         
          { (!inputVerify && !adiminObject.token) &&<button style={{height: '3%', width: '5%', marginTop: '1%'}} data-testid='login' onClick={handleSubmit}>Kirjaudu</button>} 
         
          { (inputVerify ) && 
            <div style={{color:'black'}}>
              <input value={inputCode} onChange={(e) => setInpuCode(e.target.value)}></input> 
              <button data-testid='sendCode' onClick={() => sendVerifyCode()}> SEND VERIFY CODE</button> 
            </div>}
       
          
        { adiminObject.token && 
          <div style={{justifyContent: 'center', display: 'flex', justifyItems:'center', width: '60%'}}> 
             <input onChange={(e) =>setFiterInput(e.target.value)}/> <div>Seach by Surname</div>
            <button onClick={() => makeExcel()}> DOWNLOAD IN EXCEL</button>
              <table data-testid='database'>
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
                  <th>Date</th>
                </tr>
              {renderTable()}
            </table>
         </div>
        }

        </div>
      </div>
    </div>
        
  );
}

export default Admin;
