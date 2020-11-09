const express = require('express');
const config = require('./config/config');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

//pdfGenerator app.use(bodyParser.urlencoded({ extended: true }));
//pdfGenerator const pdfRoute = require('./PdfGenerator/routes/pdfmake');
//pdfGenerator app.use('/pdfMake', pdfRoute);

//auth require('./db/mongoose');
//auth const routesAuthenticate = require('./Authentication/routes/routefile');
//auth app.use(cors());
//auth app.use(express.json());
//auth app.use(routesAuthenticate);
//auth app.get('/tests/:id', function(req, res, next) {
//auth     res.json({ msg: 'This is CORS-enabled for all origins!' });
//auth })

//sendmail const routesEmail = require('./MailSender/routes/routefile');
//sendmail app.use(cors());
//sendmail app.get('/sendmail', function(req, res, next) {
//sendmail     res.json({ msg: 'This is CORS-enabled for all origins!' });
//sendmail })
//sendmail app.use(express.json());
//sendmail app.use(routesEmail);


//CrudSer  const path = require('path');
//CrudSer require('./db/mongoose');
//CrudSer const crudRoute = require('./CRUD/routes/employee.route')
//CrudSer app.use(bodyParser.json());
//CrudSer app.use(bodyParser.urlencoded({
//CrudSer    extended: false
//CrudSer }));
//CrudSer app.use(cors());
//CrudSer app.use(express.static(path.join(__dirname, 'dist/crud-app')));
//CrudSer app.use('/', express.static(path.join(__dirname, 'dist/crud-app')));
//CrudSer app.use('/api', crudRoute)

app.listen(config.PORT, () => {
    console.log(`** Proto-Box Live Development Server is listening on 👍 ${config.URL}:${config.PORT}/**`);
})