const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/Soka"

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true  })

const user = require('./user.js')

module.exports = { user};
