const mongoose = require('mongoose')
const bcrypt   = require('bcryptjs')
const jwt      = require('jsonwebtoken')
const datas    = require('./data')

//const Post      = require('./post')
const TestSchema  = new mongoose.Schema(
    datas.data
  );

// TestSchema.virtual('posts', {
//     ref: 'Post',
//     localField: '_id',
//     foreignField: 'author'
// })


TestSchema.statics.checkValidCredentials = async (email, password) => {
    const test = await Test.findOne({email})

    if(!test){
        throw new Error('Unable to login 2')
    }
    const isMatch = await bcrypt.compare(password,test.password)

    if(!isMatch){
        throw new Error('Unable to login 2')
    }

    return test
}

TestSchema.methods.newAuthToken = async function(){
    const test  = this
    const token =  jwt.sign({ _id: test.id.toString()}, "thisiskey")
    test.tokens = test.tokens.concat({ token })
    await test.save()
    return token
}

TestSchema.methods.toJSON = function(){
    const test = this
    const testObj = test.toObject()

    delete testObj.password
    delete testObj.tokens

    return testObj
}

//hash the plain text password before saving
TestSchema.pre('save', async function(next){
    const test = this
    if(test.isModified('password')){
        test.password = await bcrypt.hash(test.password, 8)
    }
    next()
})

TestSchema.pre('remove', async function(next){
    const test = this
    await Post.deleteMany({author: test._id})
    next()
})

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
