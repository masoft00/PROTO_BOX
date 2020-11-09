const express = require('express');
const app = express();
const crudRoute = express.Router();

// Employee model
let Crud = require('../models/models');

// Add Employee
crudRoute.route('/').post((req, res, next) => {
    Crud.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Get All Employees
crudRoute.route('/getAll').get((req, res) => {
    Crud.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Get single employee
crudRoute.route('/getOne/:id').get((req, res) => {
    Crud.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update employee
crudRoute.route('/update/:id').put((req, res, next) => {
    Crud.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

// Delete employee
crudRoute.route('/delete/:id').delete((req, res, next) => {
    Crud.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = crudRoute;