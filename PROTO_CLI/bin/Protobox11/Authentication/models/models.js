const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const datas    = require('./data')

//const Post      = require('./post')
const AuthenticationSchema  = new mongoose.Schema(
    datas.data
  );

AuthenticationSchema.statics.checkValidCredentials = async (email, password) => {
    const authentication = await Authentication.findOne({email})

    if(!authentication){
        throw new Error('Unable to login 2')
    }
    const isMatch = await bcrypt.compare(password,authentication.password)

    if(!isMatch){
        throw new Error('Unable to login 2')
    }

    return authentication
}

AuthenticationSchema.methods.newAuthToken = async function(){
    const authentication  = this
    const token =  jwt.sign({ _id: authentication.id.toString()}, "thisiskey")
    authentication.tokens = authentication.tokens.concat({ token })
    await authentication.save()
    return token
}

AuthenticationSchema.methods.toJSON = function(){
    const authentication = this
    const authenticationObj = authentication.toObject()

    delete authenticationObj.password
    delete authenticationObj.tokens

    return authenticationObj
}

//hash the plain text password before saving
AuthenticationSchema.pre('save', async function(next){
    const authentication = this
    if(authentication.isModified('password')){
        authentication.password = await bcrypt.hash(authentication.password, 8)
    }
    next()
})

AuthenticationSchema.pre('remove', async function(next){
    const authentication = this
    await Post.deleteMany({author: authentication._id})
    next()
})

const Authentication = mongoose.model('Authentication', AuthenticationSchema);

module.exports = Authentication;
