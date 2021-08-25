const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const User = db.user;
const Role = db.role;

// singup
exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8) // bcrypt
    });

    // save user
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        // if role(s) is specified in request
        if (req.body.roles) {
            // find roles
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id); // assign roles to user
                    user.save((err) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.json({
                            message: "User was registered successfully!",
                            user
                        });
                    });
                }
            );
        } else {
            // if no role(s) is specified
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id]; // assign user role to user
                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.json({
                        message: "User was registered successfully!",
                        user
                    });
                });
            });
        }
    });
};

// signin
exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                res.status(404).send({ message: "User Not found." });
                return;
            }

            // compare passwords using bcrypt
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
                return;
            }

            // generate token using jsonwebtoken
            const token = jwt.sign({ id: user.id }, process.env.JWT_AUTHKEY, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles.map((r) => r.name), // role names
                accessToken: token
            });
        });
};
