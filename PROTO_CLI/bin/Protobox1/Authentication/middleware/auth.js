const jwt  = require('jsonwebtoken')
const Register = require('../models/models')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        
        const decoded  =  jwt.verify(token, "thisiskey")
       
        const register  = await Register.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!register){
            throw new Error()
        }
        req.token = token
        req.register = register
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth
