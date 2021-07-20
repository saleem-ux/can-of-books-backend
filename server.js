'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');



const mongoose = require('mongoose');
mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });

const {myUserModel} = require('./modules/userModel')

const app = express();
app.use(cors());

app.use(express.json())

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


// ==============================================> lab 13
// http://localhost:3001/book

app.post('/book', addNewBook)

function addNewBook(req, res) {
  console.log(req.body)
  let { addTitle, addDescription, addLink, addStatus, email } = req.body

  myUserModel.find({ email: email }, (error, bookData) => {
    if (error) {
      res.send('No Data', error)
    } else {
      console.log(bookData);
      bookData[0].book.push({
        name: addTitle,
        description: addDescription,
        status: addStatus,
        img: addLink
      })
      console.log(bookData[0]);
      bookData[0].save()
      res.send(bookData[0].book)
    }
  })
}


// http://localhost:3001/deleteBook

app.delete('/deleteBook/:bookId', deleteBook)

function deleteBook(req, res) {

  let index = Number(req.params.bookId);
  let email = req.query.email;

  myUserModel.find({ email: email }, (error, bookData) => {
    if (error) {
      res.send('No Data', error)
    } else {
      let newBookData = bookData[0].book.filter((book, idx) => {
        if (idx !== index) {
          return book
        }
      })
      bookData[0].book = newBookData
      bookData[0].save()
      res.send(bookData[0].book)
    }
  })
}

// ================================================================ lab 14

// http://localhost:3001/updateBook

app.put('/updateBook/:id', updateBooks)

function updateBooks (req,res){
// console.log(req.body);
  let { updateTitle, updateDescription, updateImage, updateStatus, email } = req.body
  let index = Number(req.params.id);
myUserModel.findOne({email: email},(error, updatedBook) => {
  if (error) {
    res.send ('No Data' , error)
  }else {
    // console.log(updatedBook);
    updatedBook.book.splice(index,1,{
      name: updateTitle,
      description: updateDescription,
      status: updateStatus,
      img: updateImage
    })
    // console.log(updatedBook);
    updatedBook.save();
    res.send(updatedBook.book)
  }
})

}




app.listen(PORT, () => console.log(`listening on ${PORT}`));