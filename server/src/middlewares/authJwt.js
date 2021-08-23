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

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};


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

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
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