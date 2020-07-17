const express = require('express');
require('./db/mongoose');
var config    = require('../config/config');
const routes  = require('./routes/routefile');
var cors      = require('cors');
const app     = express();
app.use(cors());

app.use(express.json());

app.use(routes);

app.get('/tests/:id', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' });
})

app.listen(config.PORT,() =>{
    console.log(`[OK] Server listening on 👍 ${config.URL}:${config.PORT}/`);
})

