
const express = require('express')
const app = express();
const cors = require('cors')
const  AWS = require('aws-sdk');
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwtKey = "kalevakoodi"
const jwtExpirySeconds = 300;
const jwtSecret = '123';

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
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});
const use = "USE kaleva;";
let dataArray = [];
connection.query(use);
connection.query("SELECT * FROM PERSON", function (err, result, fields) {
  const array = JSON.parse(JSON.stringify(result))
  dataArray.push(...array);

});
connection.end();

app.use(cors())
app.use(express.json())

app.post('/admin', async (req, res) => {

  const {user, password} = req.body;
  const adminUser = process.env.RDS_USERNAME;
  const adminPassword = process.env.RDS_PASSWORD;

  if (user === adminUser && adminPassword === password) {
    
    let token = jwt.sign({ foo: 'bar' }, jwtSecret);
    return res.status(200).send({token: token, loginResponse: 'Right user and password'});
  } else {
    return res.status(401).send("Wrong password");
  }
});
const verifyToken = (req, res, next) => {
  // Hae token pyynnön otsakkeista, esimerkiksi Authorization-headerista
  const token = req.headers['authorization'];

  if (!token) {
    // Tokenia ei annettu
    return res.status(401).json({ message: 'Token puuttuu' });
  }

  try {
    // Tarkista tokenin validius
    const decoded = jwt.verify(token, jwtSecret);
    // Token varmennettu, voit esimerkiksi tallentaa varmennetun käyttäjän tiedot req-objektiin jatkokäsittelyä varten
    req.user = decoded;
    // Siirry seuraavaan middlewareen
    next();
  } catch (err) {
    // Token on virheellinen
    return res.status(401).json({ message: 'Virheellinen token' });
  }
}

app.get('/', async (req, res) => {
     // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = jwt.sign(data, jwtSecretKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    } 
 
});

app.post('/userData', async function(req,res) {

  const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
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
  const use = "USE kaleva;";
  const sql= `INSERT INTO PERSON VALUES ('${object.firstName}', '${object.lastName}', '${object.age}', '${object.email}', '${object.gender}', '${object.phone}', '${object.tshirt}', '${object.team}', '${licenseCard}', '${object.hopes}', '${object.freeText}', '${object.PersonID}');`;
  connection.query(use);
  connection.query(sql);
  connection.end();
  dataArray.push(req.body);
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
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
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
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
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
  //const index = dataArray.findIndex((value) => value.PersonID === id);

  let array = dataArray.filter((value) => value.PersonID != id);
  dataArray = array;
  return res.status(200).send(array);
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })