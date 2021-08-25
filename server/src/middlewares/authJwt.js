const jwt = require("jsonwebtoken");
const db = require("../models");

require("dotenv").config();

const User = db.user;
const Role = db.role;

// verify json webtoken
const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"]; // get token from req headers

    if (!token) {
        res.status(403).send({ message: "No token provided" });
        return;
    }

    // verify token
    jwt.verify(token, process.env.JWT_AUTHKEY, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }

        req.userId = decoded.id; // if all good, set user id to decoded id
        next();
    });
};

// check if user is admin
const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                // check if admin is included in roles
                if (roles.map((r) => r.name).includes("admin")) {
                    next();
                    return;
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};

// check if user is moderator
const isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                // check if moderator is included in roles
                if (roles.map((r) => r.name).includes("moderator")) {
                    next();
                    return;
                }

                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};

module.exports = authJwt;