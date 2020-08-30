const express = require('express');
const config = require('./config/config');
const app = express();
const cors = require('cors');

//auth require('./db/mongoose');
//auth const routes1 = require('./Authentication/routes/routefile');
//auth app.use(cors());
//auth app.use(express.json());
//auth app.use(routes1);
//auth app.get('/tests/:id', function(req, res, next) {
//auth     res.json({ msg: 'This is CORS-enabled for all origins!' });
//auth })

//sendmail const routes = require('./MailSender/routes/routefile');
//sendmail app.use(cors());
//sendmail app.get('/sendmail/:id', function(req, res, next) {
//sendmail     res.json({ msg: 'This is CORS-enabled for all origins!' });
//sendmail })
//sendmail app.use(express.json());
//sendmail app.use(routes);

//CrudSer const bodyParser = require('body-parser');
//CrudSer const routesCrud = require('./CRUD/routes/routefile')
//CrudSer require('./db/mongoose');
//CrudSer app.use(express.json())
//CrudSer app.use(bodyParser.urlencoded({
//CrudSer     extended: true
//CrudSer }));
//CrudSer app.use('/cruds', routesCrud)

app.listen(config.PORT, () => {
    console.log(`[OK] Server listening on 👍 ${config.URL}:${config.PORT}/`);
})