
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


const s3 = new AWS.S3({
  region: 'eu-north-1',
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

app.use(cors())
app.use(express.json())


let jwtSecretKey = process.env.JWT_SECRET_KEY;
let data = {
    time: Date(),
    userId: 12,
}

const token = jwt.sign(data, jwtSecretKey);
app.get('/', async (req, res) => {
  
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  console.log('req', req.header());
  try {
      const token = req.header(tokenHeaderKey);

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
  const use = "USE kaleva;";
  const sql= "INSERT INTO COMPANY VALUES (5, 'seura1')";
  connection.query(use);
  connection.query(sql);
  return res.status(200).send("It's working");
});

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })