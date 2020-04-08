const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const datas    = require('./data')

//const Post      = require('./post')
const AuthenSchema = new mongoose.Schema(datas.data)

AuthenSchema.statics.checkValidCredentials = async (email, password) => {
  const authen = await Authen.findOne({ email })

  if (!authen) {
    throw new Error('Unable to login 2')
  }
  const isMatch = await bcrypt.compare(password, authen.password)

  if (!isMatch) {
    throw new Error('Unable to login 2')
  }

  return authen
}

AuthenSchema.methods.newAuthToken = async function () {
  const authen = this
  const token = jwt.sign({ _id: authen.id.toString() }, 'thisiskey')
  authen.tokens = authen.tokens.concat({ token })
  await authen.save()
  return token
}

AuthenSchema.methods.toJSON = function () {
  const authen = this
  const authenObj = authen.toObject()

  delete authenObj.password
  delete authenObj.tokens

  return authenObj
}

//hash the plain text password before saving
AuthenSchema.pre('save', async function (next) {
  const authen = this
  if (authen.isModified('password')) {
    authen.password = await bcrypt.hash(authen.password, 8)
  }
  next()
})

AuthenSchema.pre('remove', async function (next) {
  const authen = this
  await Post.deleteMany({ author: authen._id })
  next()
})

const Authen = mongoose.model('Authen', AuthenSchema)

module.exports = Authen
