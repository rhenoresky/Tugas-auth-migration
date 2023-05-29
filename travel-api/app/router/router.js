const { checkRequest, verifyToken, checkDuplicateUserNameOrEmail } = require("../api/auth");
const { createBooking, listBooking, bookingByUser, bookingByDestination, bookingByVehicle, bookingById, updateBooking, deleteBooking } = require("../api/booking");
const { signup, signin, profileUpdate } = require("../api/user");

module.exports = function (app) {
	app.post('/api/auth/booking', verifyToken, createBooking)
    app.post('/api/signup', checkRequest, checkDuplicateUserNameOrEmail, signup)
    app.post('/api/signin', signin)
    app.put('/api/auth/:username', verifyToken, profileUpdate)
    app.put('/api/auth/booking/:id', verifyToken, updateBooking)
    app.get('/api/auth/booking', verifyToken, listBooking)
    app.get('/api/auth/bookinguser/:username', verifyToken, bookingByUser)
    app.get('/api/auth/bookingdestination/:direction',verifyToken, bookingByDestination)
    app.get('/api/auth/bookingvehicle/:name', verifyToken, bookingByVehicle)
    app.get('/api/auth/booking/:id', verifyToken, bookingById)
    app.delete('/api/auth/booking/:id', verifyToken, deleteBooking)
    }