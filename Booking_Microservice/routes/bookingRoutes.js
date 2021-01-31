const express = require('express') // Import express
const router = express.Router() // Make router from app
const auth = require('../middlewares/auth'); // Import auth
const BookingController = require('../controllers/bookingController.js') // Import TransaksiController
const bookingValidator = require('../middlewares/validators/bookingValidator.js') // Import validator to validate every request from user
const passport=require ('passport')

router.get('/', BookingController.getAll) // If accessing localhost:3000/transaksi, it will call getAll function in TransaksiController class
//router.get('/:id_field/booked', bookingValidator.getBookedTimeslot, BookingController.getBookedTimeslotPersonal)
router.get('/:id_field/bookedfield', bookingValidator.getBookedTimeslot, BookingController.getBookedTimeslotField) // If accessing localhost:3000/transaksi, it will call getAll function in TransaksiController class
router.get('/:id_field/bookedteam', bookingValidator.getBookedTimeslot, BookingController.getBookedTimeslotTeam)
router.get('/:id_field/available',bookingValidator.getBookedTimeslot, BookingController.getAvailableTeam);
router.get('/:id', [passport.authenticate('user', { session: false }), bookingValidator.getOne],BookingController.getOne) // If accessing localhost:3000/transaksi/:id, it will call getOne function in TransaksiController class
//router.post('/:id_field/create',[passport.authenticate('user', { session: false }), bookingValidator.BookedAsPerson], BookingController.BookedAsPerson)
router.post('/:id_field/create/bookedfield', [passport.authenticate('user', { session: false }), bookingValidator.BookedAsField], BookingController.BookedAsField) // If accessing localhost:3000/transaksi/create, it will call create function in TransaksiController class
router.post('/:id_field/create/bookedteam',[passport.authenticate('user', { session: false }), bookingValidator.BookedAsTeam], BookingController.BookedAsTeam)
router.delete('/delete/:id',[passport.authenticate('superUser', { session: false }), bookingValidator.delete], BookingController.delete) // If accessing localhost:3000/transaksi/delete/:id, it will call delete function in TransaksiController class

module.exports = router; // Export router
