const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mysql = require("mysql2");

require('dotenv').config();

const api = require('./api');

const app = express();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) return console.log(err);
    console.log("Connected");
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({
    message: "green sweater"
}));

app.use("/api/v1", api);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening (${port})`));
