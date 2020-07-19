const express = require('express');
const config = require('./config/config');
const app = express();
const cors = require('cors');
require('./db/mongoose');
const routes1 = require('./Authentication/routes/routefile');

app.listen(config.PORT, () => {
    console.log(`[OK] Server listening on 👍 ${config.URL}:${config.PORT}/`);
})


app.use(cors());
app.use(express.json());
app.use(routes1);
app.get('/users/:id', function(req, res, next) {
    res.json({ msg: 'This is CORS-enabled for all origins!' });
})


//const routes = require('./MailSender/routes/routefile');
//app.use(cors());
//app.get('/tests/:id', function(req, res, next) {
//    res.json({ msg: 'This is CORS-enabled for all origins!' });
//})
//app.use(express.json());
//app.use(routes);