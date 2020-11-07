const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const datas    = require('./data')

//const Post      = require('./post')
const RegisterSchema  = new mongoose.Schema(
    datas.data
  );

// RegisterSchema.virtual('posts', {
//     ref: 'Post',
//     localField: '_id',
//     foreignField: 'author'
// })


RegisterSchema.statics.checkValidCredentials = async (email, password) => {
    const register = await Register.findOne({email})

    if(!register){
        throw new Error('Unable to login 2')
    }
    const isMatch = await bcrypt.compare(password,register.password)

    if(!isMatch){
        throw new Error('Unable to login 2')
    }

    return register
}

RegisterSchema.methods.newAuthToken = async function(){
    const register  = this
    const token =  jwt.sign({ _id: register.id.toString()}, "thisiskey")
    register.tokens = register.tokens.concat({ token })
    await register.save()
    return token
}

RegisterSchema.methods.toJSON = function(){
    const register = this
    const registerObj = register.toObject()

    delete registerObj.password
    delete registerObj.tokens

    return registerObj
}

//hash the plain text password before saving
RegisterSchema.pre('save', async function(next){
    const register = this
    if(register.isModified('password')){
        register.password = await bcrypt.hash(register.password, 8)
    }
    next()
})

RegisterSchema.pre('remove', async function(next){
    const register = this
    await Post.deleteMany({author: register._id})
    next()
})

const Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;
