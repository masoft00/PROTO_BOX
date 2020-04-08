const jwt    = require('jsonwebtoken')
const Authen = require('../models/models')

const auth = async (req, res, next) => {
  try {
    const token = req
      .header('Authorization')
      .replace('Bearer', '')
      .trim()

    const decoded = jwt.verify(token, 'thisiskey')

    const authen = await Authen.findOne({
      _id: decoded._id,
      'tokens.token': token
    })

    if (!authen) {
      throw new Error()
    }
    req.token = token
    req.authen = authen
    next()
  } catch (error) {
    console.log(error)
    res.status(401).send({ error: 'Please authenticate!' })
  }
}

module.exports = auth
