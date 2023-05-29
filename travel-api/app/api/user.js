const User = require('../models').User
const config = require('../config/config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async signup(req, res) {
        await User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
        res.status(200).send({
            auth: true,
            message: "User registered successfully!",
            errors: null,
        });
    },

    async signin(req, res) {
        if (!req.body.password) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Password cannot be empty"
            });
            return;
        }
        if (!req.body.username) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Username cannot be empty"
            });
            return;
        }
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        })

        if (!user) {
            res.status(404).send({
                auth: false,
                accessToken: null,
                message: "Error",
                errors: "User Not Found."
            });
            return
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            res.status(401).send({
                auth: false,
                id: req.body.id,
                accessToken: null,
                message: "Error",
                errors: "Invalid Password!"
            });
            return
        }

        let token = 'Bearer ' + jwt.sign({
            username: user.username
        }, config.secret, {
            expiresIn: 86400 //24h expired
        });

        res.status(200).send({
            auth: true,
            accessToken: token,
            message: "Signin Successfully",
            errors: null
        });
    },

    async profileUpdate(req, res) {
        const profil = await User.findOne({
            where: {
                username: req.params.username
            }
        })
        if (!profil) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "User Not Found"
            })
            return
        }
        profil.username = req.body.username
        profil.name = req.body.name
        profil.email = req.body.email
        profil.password = bcrypt.hashSync(req.body.password, 8)

        await profil.save()
        res.status(200).send({
            auth: true,
            message: "Update Successfully",
            errors: null
        });
    }
}