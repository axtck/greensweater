const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// create db
const db = {};

db.mongoose = mongoose; // add mongoose

// add models
db.user = require("./user.model");
db.role = require("./role.model");

// add constants
db.ROLES = ["user", "admin", "moderator"]; // possible roles 

module.exports = db;