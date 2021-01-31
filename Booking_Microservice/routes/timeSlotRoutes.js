const express = require('express') // Import express
const router = express.Router() // Make router from app
const TimeSlotController = require('../controllers/timeSlotController.js') // Import TransaksiController
const timeSlotValidator = require('../middlewares/validators/timeSlotValidator.js') // Import validator to validate every request from user

router.get('/', TimeSlotController.getAll) // If accessing localhost:3000/transaksi, it will call getAll function in TransaksiController class
router.get('/:id', TimeSlotController.getOne) // If accessing localhost:3000/transaksi/:id, it will call getOne function in TransaksiController class
router.post('/create',  TimeSlotController.create) // If accessing localhost:3000/transaksi/create, it will call create function in TransaksiController class
router.put('/update/:id', TimeSlotController.update) // If accessing localhost:3000/transaksi/update/:id, it will call update function in TransaksiController class
// router.delete('/delete/:id', TimeSlotController.delete) // If accessing localhost:3000/transaksi/delete/:id, it will call delete function in TransaksiController class

module.exports = router; // Export router
