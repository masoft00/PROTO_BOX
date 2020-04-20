const express = require('express')
require('./db/mongoose')
var config    = require('./config/config')
const routes  = require('./routes/routefile')
const app     = express()
var cors      = require('cors')
app.use(cors())

app.get('/authentications/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' })
})

app.use(express.json())
app.use(routes)
app.get('/', function (req, res, next) {
  res.send('hello world!')
})

app.listen(config.PORT, () => {
  console.log(`Server running 👍 at http://${config.URL}:${config.PORT}/`)
})
