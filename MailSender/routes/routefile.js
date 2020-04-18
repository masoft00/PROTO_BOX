const nodemailer = require('nodemailer')
const express    = require('express')
require('dotenv').config()
const router     = new express.Router()

router.post('/sendMail', async (req, res) => {
  try {
    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host  : 'smtp.gmail.com',
      port  : 587,
      secure: false,
      auth  : {
        user: process.env.email,
        pass: process.env.password
      }
    })
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from   : process.env.email, // sender address
      to     : req.body.destinataire, // list of receivers
      subject: req.body.subject, // Subject line
      text   : req.body.text // plain text body
    })
    res.status(201).send('Message envoyé')
  } catch (e) {
    res.status(400).send(e)
  }
})
module.exports = router
