require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const port = 3000


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db =mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', () =>console.log('The database is ready to run'))

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.listen(port, ()=>console.log('The server is running on port' +port))
const router = express.Router();


