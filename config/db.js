require('dotenv').config()

const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.dataBaseUrl)

module.exports ={connection}