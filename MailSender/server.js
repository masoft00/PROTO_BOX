const express = require('express');
swig = require('swig');
mailer = require('express-mailer');
path = require('path');
server = express();


server.use(express.logger());

//pour recupérer les données d'un formulaire
server.use(express.bodyParser());

// server.use(express.static(path.join(__dirname, 'public')));

// server.engine('html', swig.renderFile);
// server.set('views', __dirname + '/views');
// server.set('view engine', 'html');
// server.get('/', (req, res) => {
//     res.render('index');
// });



server.listen(3000);
console.log('server is running');