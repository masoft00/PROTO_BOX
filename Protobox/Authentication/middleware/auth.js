const jwt  = require('jsonwebtoken')
const Test = require('../models/models')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        
        const decoded  =  jwt.verify(token, "thisiskey")
       
        const test  = await Test.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!test){
            throw new Error()
        }
        req.token = token
        req.test = test
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth
