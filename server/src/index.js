const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const api = require("./api");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors()); // cors - change when in prod 
app.use(express.json()); // parse requests of content-type - application/json

const mdbDatabase = process.env.MONGO_DATABASE;
const mdbHost = process.env.MONGO_HOST;
const mdbPort = process.env.MONGO_PORT;
const mdbPassword = process.env.MONGO_PASSWORD;
const mdbUser = process.env.MONGO_USER;

const db = require("./models");
const Role = db.role;

const mongoUrl = `mongodb://${mdbUser}:${mdbPassword}@${mdbHost}:${mdbPort}/?authSource=admin`;

db.mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => initial())
    .catch((err) => {
        console.error(err);
        process.exit();
    });

const initial = () => {
    console.log("Connected, running initial");
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            // create user
            new Role({
                name: "user"
            }).save((err) => {
                if (err) console.error(err); // should I return?
                console.log("added 'user' to roles collection");
            });

            // create moderator
            new Role({
                name: "moderator"
            }).save((err) => {
                if (err) console.error(err);
                console.log("added 'moderator' to roles collection");
            });

            // create admin
            new Role({
                name: "admin"
            }).save((err) => {
                if (err) console.log("error", err);

                console.log("added 'admin' to roles collection");
            });
        }
    });
};

app.get("/", (req, res) => {
    res.json({
        message: "base route for API"
    });
});

app.use("/api/v1", api);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening (${port})`));
