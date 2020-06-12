const jwt  = require('jsonwebtoken')
const Testmor = require('../models/models')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        
        const decoded  =  jwt.verify(token, "thisiskey")
       
        const testmor  = await Testmor.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!testmor){
            throw new Error()
        }
        req.token = token
        req.testmor = testmor
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth
