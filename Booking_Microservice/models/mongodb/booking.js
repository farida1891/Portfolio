const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const BookingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  fullname: {
    type: String
  },
  id_field:{
    type:mongoose.Schema.Types.ObjectId
  },
  field: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  paymentstatus: {
    type: Boolean,
    required: true
  },
  paymentconfirmation: {
    type: String,
    required: false
  },

  transaction: {
    type: Boolean,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  player_position: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  id_timeslot:{
    type:Array,
    required:true
  },

  timeslot: {
    type: Array,
    required: true
  },
  booked: {
    type: String,
    required: true
  },
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false
})

BookingSchema.set('toJSON', {
  getters: true
})

BookingSchema.plugin(mongoose_delete, {
  overrideMethods: 'all'
});

module.exports = Booking = mongoose.model('Booking', BookingSchema, 'Booking');
