const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const User = require('../models').User

module.exports = {
    verifyToken(req, res, next) {
        let tokenHeader = req.headers['x-access-token'];

        if (tokenHeader.split(' ')[0] !== 'Bearer') {
            return res.status(500).send({
                auth: false,
                message: "Error",
                errors: "Incorrect token format"
            });
        }

        let token = tokenHeader.split(' ')[1];

        if (!token) {
            return res.status(403).send({
                auth: false,
                message: "Error",
                errors: "No token provided"
            });
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: "Error",
                    errors: err
                });
            }
            req.username = decoded.username;
            next();
        });
    },

    async checkDuplicateUserNameOrEmail(req, res, next) {
        const username = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (username) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Username is already taken!"
            });
            return;
        }

        const email = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (email) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Email is already taken!"
            });
            return;
        }
        next();
    },

    checkRequest(req, res, next) {
        if (!req.body.username) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Username cannot be empty"
            });
            return;
        }
        if (!req.body.name) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Name cannot be empty"
            });
            return;
        }
        if (!req.body.email) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Email cannot be empty"
            });
            return;
        }
        if (!req.body.password) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Password cannot be empty"
            });
            return;
        }
        next()
    }
}