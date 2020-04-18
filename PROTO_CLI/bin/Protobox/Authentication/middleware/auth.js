const jwt  = require('jsonwebtoken')
const Authentication = require('../models/models')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        
        const decoded  =  jwt.verify(token, "thisiskey")
       
        const authentication  = await Authentication.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!authentication){
            throw new Error()
        }
        req.token = token
        req.authentication = authentication
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth
