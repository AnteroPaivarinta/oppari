
const express = require('express')
const app = express();
const cors = require('cors')
const  AWS = require('aws-sdk');
const mysql = require('mysql');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

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
const dataArray = [];
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
    return res.status(200).send("Right user and password");
  } else {
    return res.status(401).send("Wrong password");
  }
});

app.get('/', async (req, res) => {
     // Tokens are generally passed in header of request
    // Due to security reasons.
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = jwt.sign(data, jwtSecretKey);
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return res.send("Successfully Verified");
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    } 
 
});

app.post('/userData', async function(req,res) {
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database.');
  });
  console.log('Req', req.body)
  const use = "USE kaleva;";
  const sql= "INSERT INTO COMPANY VALUES (5, 'seura1')";
  connection.query(use);
  connection.query(sql);
  connection.end();
  dataArray.push(req.body);
  return res.status(200).send("It's working");
});


app.get('/userData', function(req,res) {
  return res.status(200).send(dataArray);
});

app.delete('/delete/:id', function(req,res) {

  const connection = mysql.createConnection({
    host     : process.env.RDS_HOSTNAME,
    user     : process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port     : process.env.RDS_PORT
  });
  
  let id = req.params.id;
  const index = dataArray.findIndex((value) => value.PersonID.toString() === id.toString());
  dataArray.slice(index, 1);
  console.log('INDEX', index, id, dataArray)
  const deleteQuery = 'DELETE FROM PERSON WHERE PersonID ='+id.toString()+';';
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
  return res.status(200).send('Deleted');
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })