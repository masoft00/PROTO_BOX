require('dotenv').config()
require("amd-loader")
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const fs = require('fs');
const yaml = require('js-yaml');

define([], function() {
    try {
        let fileContents = fs.readFileSync('./data.yaml', 'utf8');
        let data = yaml.safeLoad(fileContents);
        let yamlStr = yaml.safeDump(data);
        //fs.writeFileSync('./models/model.js', yamlStr, 'utf8');
        return {
             data
        };
        }
         catch (e) {
        console.log(e);
        
    }
  });