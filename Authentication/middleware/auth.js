const jwt  = require('jsonwebtoken')
const Entite = require('../models/entity')

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        
        const decoded  =  jwt.verify(token, "thisiskey")
       
        const entite  = await Entite.findOne({ _id:decoded._id, 'tokens.token': token})

        if(!entite){
            throw new Error()
        }
        req.token = token
        req.enetite = entite
        next()
    } catch (error) {
        console.log(error)
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth
