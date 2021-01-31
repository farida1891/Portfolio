const express = require('express'); // Import express
const bodyParser = require('body-parser'); // Import body-parser
const bookingRoutes = require('./routes/bookingRoutes'); // Import routes
const timeslotRoutes = require('./routes/timeSlotRoutes'); // Import routes


const app = express(); // Make API
var cors = require('cors');
app.use(cors());

//Set body parser for HTTP post operation
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

//set static assets to public directory
app.use(express.static('public'));

app.use('/booking', bookingRoutes); // If access localhost:3000, it will be go to userRoutes
app.use('/timeslot', timeslotRoutes)
// Server running on port 3000
app.listen(3003, () => {
  console.log('Booking running on port 3003!');
})
