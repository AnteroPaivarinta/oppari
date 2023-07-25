
const express = require('express');
const app = express();
const cors = require('cors');
const  AWS = require('aws-sdk');
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtKey = "kalevakoodi";
const jwtExpirySeconds = 300;
const jwtSecret = '123';
const reader = require('xlsx');
const file = reader.readFile('./backend/test.xlsx')
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'opparitesti3@gmail.com',
    pass: process.env.emailpassword
  }
});


const verifyUserToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};

const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : 'admin',
  password : process.env.RDS_PASSWORD,
  port     : '3306'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});
const use = "USE kaleva;";
connection.query(use);
let dataArray = [];
connection.query("SELECT * FROM PERSON", function (err, result, fields) {
  const array = JSON.parse(JSON.stringify(result))
  dataArray.push(...array);

});
connection.end();

app.use(cors())
app.use(express.json())

app.post('/admin', async (req, res) => {

  const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : 'admin',
    password : process.env.RDS_PASSWORD,
    port     : '3306'
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  
  const { user, password } = req.body;

  const sqlQuery = `SELECT * FROM ADMIN WHERE email ='${user}';`
  const use = "USE kaleva;";
  connection.query(use);
  connection.query(sqlQuery, async function (err, result, fields) {
    if (err) throw err;
    const userData = result[0];
    if (user === userData.email && userData.password === password) {
    
      let code = Math.floor(1000 + Math.random() * 9000);
      let mailOptions = {
        from: 'opparitesti3@gmail.com',
        to: userData.email,
        subject: 'Verify  Code',
        text: code.toString(),
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return res.status(200).send({ loginResponse: 'Right user and password', code});
    } else {
      return res.status(401).send("Wrong password");
    }
  });
});

app.post('/admin/verify', async (req, res) => {
  
  const {inputCode, code} = req.body;
  if (inputCode === code) {
    let token = jwt.sign({ foo: 'bar' }, jwtSecret);
    return res.status(200).send({token: token});
  } else {
    return res.status(401).send("Wrong verify code");
  }
});
const verifyToken = (req, res, next) => {

  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token puuttuu' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Virheellinen token' });
  }
}

app.get('/', async (req, res) => {
    let student_data = [{
      Student:'Nikhil',
      Age:22,
      Branch:'ISE',
      Marks: 70
  },
  {
      Student:'Amitha',
      Age:21,
      Branch:'EC',
      Marks:80
  }]
  const ws = reader.utils.json_to_sheet(student_data)
  reader.utils.book_append_sheet(file, ws, "Sheet3")
  reader.writeFile(file,'./test.xlsx')
  res.send('Hello');
 
});

app.post('/userData', async function(req,res) {

  const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : 'admin',
    password : process.env.RDS_PASSWORD,
    port     : '3306'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  const object = req.body;
  const licenseCard = object.licenseCard === true? 1 : 0
  let currentTime = new Date();
  let clockTime = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  let pv = currentTime.getDate();
  let kk = currentTime.getMonth() + 1; 
  let vuosi = currentTime.getFullYear();
  let time = clockTime + '/' + pv + '/' + kk + '/' + vuosi
  let tasks = object.tasks.map((value) => value.label).toString();
  let days = object.days;
  let arrayDays = []
  for (const key in days) {
    if(key.toString() === 'first' && days[key] === true){
      arrayDays.push('28.6.2024')
    }

    if(key.toString() === 'second' && days[key] === true){
      arrayDays.push('29.6.2024')
    }

    if(key.toString() === 'third' && days[key] === true){
      arrayDays.push('30.6.2024')
    }
  }

  const use = "USE kaleva;";
  const sql= `INSERT INTO PERSON VALUES ('${object.PersonID}', '${object.firstName}', '${object.lastName}', '${object.age}', '${object.email}', '${object.gender}', '${object.phone}', '${object.tshirt}', '${object.team}', '${licenseCard}', '${object.hopes}', '${object.freeText}', '${time}', '${tasks}', '${object.date}', '${arrayDays.toString}');`;
  connection.query(use);
  connection.query(sql);
  connection.end();
  dataArray.push(req.body);
  const message = 'Hei, olet ilmoittanut Kalevan 2024 kisoihin näillä tiedoilla:\n ';
  const firstNameLine = `Etunimi: ${object.firstName} \n`
  const lastNameline = `Sukunimi: ${object.lastName} \n`
  const age = `Ikä: ${object.age} \n`
  const email = `Sähköposti: ${object.email} \n`
  const gender = `Sukupuoli: ${object.gender} \n`
  const phone = `Puhelinnumero: ${object.phone} \n`
  const tshirt = `T-paita: ${object.tshirt} \n`
  const team = `Seura: ${object.team} \n`
  const licenseCardLine = `Lisenssikortti: ${object.licenseCard} \n`
  const hopes = `Toivomukset: ${object.hopes} \n`
  const freeText = `Vapaamuotoinen teksti: ${object.freeText} \n`
  const tasksLine = `Tehtävät: ${tasks} \n`
  const daysLine = `Päivät: ${arrayDays.toString()} \n`
  const total = message+firstNameLine+lastNameline+age+email+gender+phone+tshirt+team+licenseCardLine+hopes+freeText+tasksLine+daysLine;
  

  let mailOptions = {
    from: 'opparitesti3@gmail.com',
    to: object.email,
    subject: 'Ilmoittautumisvahvistus',
    text: total,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return res.status(200).send("It's working");
});


app.put('/userData', function(req,res) {
  const {
    firstName,
    lastName,
    age,
    gender,
    phone,
    email,
    team,
    freeText,
    hopes,
    tshirt,
    PersonID,
  } = req.body.data;

  const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : 'admin',
    password : process.env.RDS_PASSWORD,
    port     : '3306'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });

  const useSql = 'USE kaleva;'
  connection.query(useSql);
  const sql = `UPDATE PERSON SET firstName = '${firstName}', lastName = '${lastName}', age ='${age}', email ='${email}', gender = '${gender}', phone ='${phone}', tshirt = '${tshirt}', team = '${team}' , freeText = '${freeText}', hopes = '${hopes}' WHERE PersonID = '${PersonID}'`;
  connection.query(sql);
  connection.end();
  

  return res.status(200).send('made query');
});


app.get('/userData', verifyUserToken,  function(req,res) {
  res.json(dataArray.map((value) => value.licenseCard === 1 ? {...value, licenseCad: true} : {...value, licenseCard: false}))
});

 

app.delete('/delete/:id', function(req,res) {

  const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : 'admin',
    password : process.env.RDS_PASSWORD,
    port     : '3306'
  });
  
  let id = req.params.id;
  const deleteQuery = `DELETE FROM PERSON WHERE PersonID ='${id}';`;
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });

  const use = "USE kaleva;";
  connection.query(use);
  connection.query(deleteQuery);
  connection.end();

  let array = dataArray.filter((value) => value.PersonID != id);
  dataArray = array;
  return res.status(200).send(array);
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })