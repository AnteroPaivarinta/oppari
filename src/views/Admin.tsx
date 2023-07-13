import { useEffect, useState } from 'react';
import '../App.css';
import kuva from '../kuva.png';
import '../styles.css';
import axios from 'axios';
import { IAdmin, IAdminObject, IData, IDataIndex } from '../types';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';


const Admin = () => {

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
      axios.post("http://localhost:3001/admin", inputs).then((response) => {
        
        console.log('Post succesful', response);
        if(response.data.loginResponse === 'Right user and password'){

          setInputVerify(true);
        } 
      });
    }

    const sendVerifyCode = () => {
      axios.post("http://localhost:3001/admin/verify", inputCode).then((response) => {
        
        console.log('Post succesful', response);
        if(response.data.token){
          setAdminObject({inputVerify: false, token: response.data.token, loginResponse: true})
        } 
      });
    }

    const makeExcel = async() => {
    
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet('My Sheet');
      ws.addRows(
        ['PersonID', 'First name', 'LastName', ' Gender', 'Tshirt', 'License Card', 'Hopes', 'Team', 'Free text']
      );
      rowData.forEach((el:IDataIndex)=>{
        ws.addRows(
          [el.data.PersonID, el.data.firstName, el.data.lastName, el.data.gender, el.data.tshirt, el.data.licenseCard, el.data.hopes, el.data.team, el.data.freeText]
        );
      })
      await wb.xlsx.writeBuffer().then(buffer => FileSaver.saveAs(new Blob([buffer]), `Järjestäjät.xlsx`))
      .catch(err => console.log('Error writing excel export', err))
    }
    const onDelete = (index: string) => {
      axios.delete("http://localhost:3001/delete/"+index).then((response) => {
        const newRowData: any[] = [];
        response.data.forEach((element: IData, index:number) => {
          newRowData.push({index: index, data:element, update: false })
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
        };
        array[index] = object;
        setUpdatedRowData(array);
      }
    }

    const onSaveUpdate = (index: number) => {

      const array = updatedRowData.map((object: IDataIndex) => object.update === true? {...object, update: false} : object );
      const ob = array.find((object) => object.index === index);
      axios.put("http://localhost:3001/userData", ob).then((response) => {
        
        console.log('Putsuccesful', response);
      });
      setRowData(array);
    };


    const renderTable = () => {
      const mapArray = filterInput ? rowData.filter((value:IDataIndex) => value.data.lastName === filterInput) : rowData;
      const array = mapArray.map((value: IDataIndex, index:number ) => 
        <tr key={index.toString()}>
          <td> {value.update ? <input className='smallInput' name='firstName' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.firstName } </td> 
          <td> {value.update ? <input className='smallInput' name='lastName' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.lastName } </td> 
          <td> {value.update ? <input className='smallInput' name='age' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.age } </td> 
          <td> {value.update ? <input className='smallInput' name='email' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.email } </td> 
          <td> {value.update ? <input className='smallInput' name='gender' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.gender } </td> 
          <td> {value.update ? <input className='smallInput' name='phone' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.phone } </td> 
          <td> {value.update ? <input className='smallInput' name='tshirt' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.tshirt } </td> 
          <td> {value.update ? <input className='smallInput' name='team' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.team } </td> 
          <td> {value.update ? <input className='smallInput' name='hopes' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.hopes } </td> 
          <td> {value.update ? <input className='smallInput' name='freeText' onChange={(e) => handleChangeUpdate(e, index)}/> : value.data.freeText } </td> 
          { !value.update && <button onClick={() => onDelete(value.data.PersonID)}> DELETE</button>}
          { !value.update ?<button onClick={() => onUpdate(value.index)}> UPDATE</button> :  <div style={{flexDirection: 'row', display: 'flex'}}> <button onClick={() => onSaveUpdate(index)}>Save</button><button>Cancel</button></div>}
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
        axios.get("http://localhost:3001/userData", config)
        .then(function (response) {
          const array = response.data;
          const newRowData: any[] = [];
          array.forEach((element: IData, index:number) => {
            newRowData.push({index: index, data:element, update: false })
          });
          setRowData(newRowData);
        });
      }
    }, [logResponse]);

 

  return (
    <div data-testid='Admin' style={{ backgroundImage: `url(${kuva})`, backgroundRepeat: 'no-repeat', minHeight: '100%', height: '100vh', backgroundSize: 'cover' }}>
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
          <input onChange={(e) =>setFiterInput(e.target.value)}/> <div>Seach by Surname</div>
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
          { inputVerify && 
            <div>
              <input value={inputCode} onChange={(e) => setInpuCode(e.target.value)}></input> 
              <button onClick={() => sendVerifyCode()}> SEND VERIFY CODE</button> 

            </div>}
          <button onClick={() => makeExcel()}> DOWNLOAD IN EXCEL</button>
          
          </div>}

        </div>
      </div>
    </div>
        
  );
}

export default Admin;
