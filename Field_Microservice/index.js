const express = require('express') // Import express
const app = express() // Make express app
const bodyParser = require('body-parser') // Import bodyParser
const fieldRoutes = require('./routes/fieldRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
// const userRoutes = require('./routes/userRoutes');
const cors=require('cors')

app.use(cors())
//Set body parser for HTTP post operation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

//set static assets to public directory
app.use(express.static('public'));

app.use('/field', fieldRoutes);
app.use('/review', reviewRoutes);


app.listen(3001, () => console.log('Server running on localhost:3001')) // Run server with port 3000

module.exports = app; // exports app
