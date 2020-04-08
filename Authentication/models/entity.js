const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const datas    = require('./data')

//const Post      = require('./post')
const EntiteSchema  = new mongoose.Schema(
    datas.data
  );

// UserSchema.virtual('posts', {
//     ref: 'Post',
//     localField: '_id',
//     foreignField: 'author'
// })


EntiteSchema.statics.checkValidCredentials = async (email, password) => {
    const entite = await Entite.findOne({email})

    if(!entite){
        throw new Error('Unable to login 2')
    }
    const isMatch = await bcrypt.compare(password,entite.password)

    if(!isMatch){
        throw new Error('Unable to login 2')
    }

    return entite
}

EntiteSchema.methods.newAuthToken = async function(){
    const entite  = this
    const token =  jwt.sign({ _id: entite.id.toString()}, "thisiskey")
    user.tokens = entite.tokens.concat({ token })
    await entite.save()
    return token
}

EntiteSchema.methods.toJSON = function(){
    const entite = this
    const entiteObj = entite.toObject()

    delete entiteObj.password
    delete entiteObj.tokens

    return entiteObj
}

//hash the plain text password before saving
EntiteSchema.pre('save', async function(next){
    const entite = this
    if(entite.isModified('password')){
        entite.password = await bcrypt.hash(entite.password, 8)
    }
    next()
})

EntiteSchema.pre('remove', async function(next){
    const entite = this
    await Post.deleteMany({author: entite._id})
    next()
})

const Entite = mongoose.model('Entite', EntiteSchema);

module.exports = Entite;
