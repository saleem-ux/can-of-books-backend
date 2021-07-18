const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
    img: String
  })
  
  const userSchema = new mongoose.Schema({
    email: String,
    book: [bookSchema]
  })
  
  const myUserModel = mongoose.model('book', userSchema)
  
  const seedUserCollection = () => {
    const saleem = new myUserModel({
        email: 'saleem_diab86@yahoo.com',
        book: [
            { name: 'The Growth Mindset', description: 'Dweck coined the terms fixed mindset and growth mindset to describe the underlying beliefs people have about learning and intelligence. When students believe they can get smarter, they understand that effort makes them stronger. Therefore they put in extra time and effort, and that leads to higher achievement.', status: 'FAVORITE FIVE', img: 'https://m.media-amazon.com/images/I/61bDwfLudLL._AC_UL640_QL65_.jpg' },

            { name: 'The Momnt of Lift', description: 'Melinda Gates shares her how her exposure to the poor around the world has established the objectives of her foundation.', status: 'RECOMMENDED TO ME', img: 'https://th.bing.com/th/id/OIP.1pKvBUNAiV_ErdHRAwl2pgAAAA?w=136&h=180&c=7&o=5&pid=1.7' },

            { name: 'The Midnight Library', description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices . . . Would you have done anything different, if you had the chance to undo your regrets?', status: 'RECOMMENDED TO ME', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIUYoJyU-LY0m7bFrOSBRpL8EySf9KVXJziA&usqp=CAU' }
        ]
    })
    saleem.save();
    // console.log(saleem);
}
// seedUserCollection();

  module.exports={myUserModel}