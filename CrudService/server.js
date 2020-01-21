require('dotenv').config()
const express    = require('express')
const app        = express()
const mongoose   = require('mongoose')
const bodyParser = require('body-parser');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database aussi ok!!!'))

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

const router    = express.Router();
const Mesroutes = require('./routes/cruds')
app.use('/cruds', Mesroutes)

app.listen(3000, () => console.log('OK pour server bi!!!'))
module.exports = router;