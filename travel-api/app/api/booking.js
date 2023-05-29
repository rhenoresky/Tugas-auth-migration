const User = require('../models').User
const Booking = require('../models').Booking
const Destination = require('../models').Destination
const Vehicle = require('../models').Vehicle

module.exports = {
    async createBooking(req, res) {
        const booking = await Booking.create({
            kode: Date.now(),
            schedule: req.body.schedule
        })
        const user = await User.findAll({
            where: {
                username: req.body.username
            }
        })
        const destination = await Destination.findAll({
            where: {
                direction: req.body.direction
            }
        })
        const vehicle = await Vehicle.findAll({
            where: {
                name: req.body.vehicle
            }
        })
        await booking.setUser(user[0].dataValues.id)
        await booking.setDestination(destination[0].dataValues.id)
        await booking.setVehicle(vehicle[0].dataValues.id)
        res.status(200).send({
            message: "Create Travel Successfully!",
            errors: null,
        });
    },

    async updateBooking(req, res) {
        const booking = await Booking.findOne({
            where: {
                id: req.params.id
            }
        })
        booking.schedule = req.body.schedule
        await booking.save()
        if (req.body.destination) {
            const destination = await Destination.findAll({
                where: {
                    direction: req.body.direction
                }
            })
            await booking.setDestination(destination[0].dataValues.id)
        }
        if (req.body.vehicle) {
            const vehicle = await Vehicle.findAll({
                where: {
                    name: req.body.vehicle
                }
            })
            await booking.setVehicle(vehicle[0].dataValues.id)
        }
        res.status(200).send({
            message: "Destination Update Successfully!",
            errors: null,
        });
    },

    async listBooking(req, res) {
        const bookings = await Booking.findAll({
            include: [
                {
                    model: User
                },
                {
                    model: Destination
                },
                {
                    model: Vehicle
                }
            ]
        })
        if (!bookings) {
            res.status(500).send({
                auth: false,
                message: "Error",
                errors: "Server Error"
            });
            return
        }
        res.status(200).send(bookings)
    },

    async bookingById(req, res) {
        const booking = await Booking.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: User
                },
                {
                    model: Destination
                },
                {
                    model: Vehicle
                }
            ]
        })
        if (!booking) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Id Not Found"
            });
            return
        }
        res.status(200).send(booking)
    },

    async bookingByUser(req, res) {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        if (!user) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "User Id Not Found"
            });
            return
        }
        const bookings = await user.getBookings({
            include: [
                {
                    model: User
                },
                {
                    model: Destination
                },
                {
                    model: Vehicle
                }
            ]
        })
        if (bookings.length <= 0) {
            res.status(200).send({
                message: 'Booking null'
            })
            return
        }
        res.status(200).send(bookings)
    },

    async bookingByDestination(req, res) {
        const destination = await Destination.findOne({
            where: {
                direction: req.params.direction
            }
        })
        if (!destination) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Destination Id Not Found"
            });
            return
        }
        const bookings = await destination.getBookings({
            include: [
                {
                    model: User
                },
                {
                    model: Destination
                },
                {
                    model: Vehicle
                }
            ]
        })
        if (bookings.length <= 0) {
            res.status(200).send({
                message: 'Booking null'
            })
            return
        }
        res.status(200).send(bookings)
    },

    async bookingByVehicle(req, res) {
        const vehicle = await Vehicle.findOne({
            where: {
                name: req.params.name
            }
        })
        if (!vehicle) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Vehicle Id Not Found"
            });
            return
        }
        const bookings = await vehicle.getBookings({
            include: [
                {
                    model: User
                },
                {
                    model: Destination
                },
                {
                    model: Vehicle
                }
            ]
        })
        if (bookings.length <= 0) {
            res.status(200).send({
                message: 'Booking null'
            })
            return
        }
        res.status(200).send(bookings)
    },

    async deleteBooking(req, res) {
        const booking = await Booking.findByPk(req.params.id)
        if (!booking) {
            return res.status(400).send({
                status_response: 'Bad Request',
                errors: 'Booking Not Found',
            });
        }
        booking.destroy()
        res.status(200).send({
            status_response: 'Delete Booking Successfully',
            errors: null,
        })
    }
}