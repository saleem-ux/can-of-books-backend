'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true, useUnifiedTopology: true });

const {myUserModel} = require('./modules/userModel')

const app = express();
app.use(cors());

const PORT = process.env.PORT
// http://localhost:3001/
app.get('/', testHandler);

function testHandler(req, res) {
  res.send('working')
}


// http://localhost:3001/books?userEmail=saleem_diab86@yahoo.com
app.get('/books',getUserData)

function getUserData(req,res){

  let userEmail = req.query.userEmail

  myUserModel.find({email:userEmail}, function(error,userData){
    if(error){
      res.send(error)
    }else {
      res.send(userData[0].book)
    }
  })
}



app.listen(PORT, () => console.log(`listening on ${PORT}`));