require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/convis'


mongoose.connect(MONGODB_URI)
   .then(() => {
       console.info(`Connected to the database: ${MONGODB_URI}`)
   })
   .catch(error => {
       console.error('Database connection error:', error);
   });