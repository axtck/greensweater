const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const api = require("./api");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

const mdbDatabase = process.env.MONGO_DATABASE;
const mdbHost = process.env.MONGO_HOST;
const mdbPort = process.env.MONGO_PORT;
const mdbPassword = process.env.MONGO_PASSWORD;
const mdbUser = process.env.MONGO_USER;

const mongoUrl = `mongodb://${mdbUser}:${mdbPassword}@${mdbHost}:${mdbPort}/?authSource=admin`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("connected");
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors()); // cors - change when in prod 
app.use(express.json()); // parse requests of content-type - application/json

app.get("/", (req, res) => {
    res.json({
        message: "base route for API"
    });
});

app.use("/api/v1", api);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening (${port})`));
