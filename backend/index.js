const express = require('express')
const cors = require('cors');

const app = express();
const dotenv = require('dotenv');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const port =5000


app.use(cors());
  
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  *** use express router **** 
app.use('/', require('./routes'));

app.listen(port,() =>{
    console.log(`server is running on ${port}`)
})
