// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const mongoose = require('mongoose');

//permer d lire et d'ecrire dans le fichier yaml
const fs = require('fs');
const js_yaml = require('js-yaml');

//lecture du fichier
const fichier = fs.readFileSync('conf.yml');
const data = js_yaml.safeLoad(fichier);

//show yaml file
mongoose.connect('mongodb://localhost/' + data.DatabaseName);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/checking', function(req, res){
//    res.json({
//       "Tutorial": "Welcome to the Node express JWT Tutorial"
//    });
// });

//appel de mes routes
app.use('/user', user);


app.listen(data.PORT, function() {
    console.log('Server is running on Port', data.PORT);
});