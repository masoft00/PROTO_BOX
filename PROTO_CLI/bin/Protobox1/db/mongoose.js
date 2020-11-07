const mongoose = require('mongoose');
const config = require('../config/config');

//mongoose.connect("mongodb://nodeauth123:nodeauth123@ds235947.mlab.com:35947/nodeauth",{
mongoose.connect("mongodb://" + config.DB.HOST + ':' + config.DB.PORT + '/' + config.DB.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('connected to database');
}).catch(() => {
    console.log('failed connected to database');
});