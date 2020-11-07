const express = require('express');
const config = require('./config/config');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

 app.use(bodyParser.urlencoded({ extended: true }));
 const pdfRoute = require('./PdfGenerator/routes/pdfmake');
 app.use('/pdfMake', pdfRoute);

 require('./db/mongoose');
 const routesAuthenticate = require('./Authentication/routes/routefile');
 app.use(cors());
 app.use(express.json());
 app.use(routesAuthenticate);
 app.get('/tests/:id', function(req, res, next) {
     res.json({ msg: 'This is CORS-enabled for all origins!' });
 })

 const routesEmail = require('./MailSender/routes/routefile');
 app.use(cors());
 app.get('/sendmail/:id', function(req, res, next) {
     res.json({ msg: 'This is CORS-enabled for all origins!' });
 })
 app.use(express.json());
 app.use(routesEmail);


 const routesCrud = require('./CRUD/routes/routefile')
 require('./db/mongoose');
 app.use(express.json())
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 app.use('/ordinateurs', routesCrud)

app.listen(config.PORT, () => {
    console.log(`[OK] Server listening on 👍 ${config.URL}:${config.PORT}/`);
})