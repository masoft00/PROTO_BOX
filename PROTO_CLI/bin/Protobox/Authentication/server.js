const express     = require('express')
require('./db/mongoose');
var config=require('./config/config')
const routes = require('./routes/routefile')

const app   = express();

app.use(express.json())

app.use(routes)

app.get('/', function (req, res) {
 res.send('hello world!');
});


app.listen(config.PORT,() =>{
    console.log(`Server running 👍 at http://${config.URL}:${config.PORT}/` )
})
