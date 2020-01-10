require("amd-loader");
const mongoose = require('mongoose')

define(['../exploitation'], function(exploitation) {
    //console.log(read.data);
    let data=exploitation.data;
    data=JSON.parse(JSON.stringify(data))
    console.log(data);
    const mySchema = new mongoose.Schema({
        data
    })
    module.exports = mongoose.model('Crud', mySchema)
});



