const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const datas    = require('./data')

//const Post      = require('./post')
const TestmorSchema  = new mongoose.Schema(
    datas.data
  );

// TestmorSchema.virtual('posts', {
//     ref: 'Post',
//     localField: '_id',
//     foreignField: 'author'
// })


TestmorSchema.statics.checkValidCredentials = async (email, password) => {
    const testmor = await Testmor.findOne({email})

    if(!testmor){
        throw new Error('Unable to login 2')
    }
    const isMatch = await bcrypt.compare(password,testmor.password)

    if(!isMatch){
        throw new Error('Unable to login 2')
    }

    return testmor
}

TestmorSchema.methods.newAuthToken = async function(){
    const testmor  = this
    const token =  jwt.sign({ _id: testmor.id.toString()}, "thisiskey")
    testmor.tokens = testmor.tokens.concat({ token })
    await testmor.save()
    return token
}

TestmorSchema.methods.toJSON = function(){
    const testmor = this
    const testmorObj = testmor.toObject()

    delete testmorObj.password
    delete testmorObj.tokens

    return testmorObj
}

//hash the plain text password before saving
TestmorSchema.pre('save', async function(next){
    const testmor = this
    if(testmor.isModified('password')){
        testmor.password = await bcrypt.hash(testmor.password, 8)
    }
    next()
})

TestmorSchema.pre('remove', async function(next){
    const testmor = this
    await Post.deleteMany({author: testmor._id})
    next()
})

const Testmor = mongoose.model('Testmor', TestmorSchema);

module.exports = Testmor;
