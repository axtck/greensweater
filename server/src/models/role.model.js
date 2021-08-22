const mongoose = require("mongoose");

// Roles 
// defines role (user, admin, moderator)
const Role = mongoose.model(
    "Role",
    new mongoose.Schema({
        name: String
    })
);

module.exports = Role;