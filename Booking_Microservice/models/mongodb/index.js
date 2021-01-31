const path = require('path');
require('dotenv').config({
path: `.env.${process.env.NODE_ENV}`
})
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI 

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }) // Make connection to mongodb penjualan_dev database

const booking = require('./booking')

module.exports = { booking };
