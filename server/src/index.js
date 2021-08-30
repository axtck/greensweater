const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");

const app = express();

require("dotenv").config();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json()); // parse requests of content-type - application/json

// connection string vars
const mdbName = "greensweaterdb";
const mdbHost = process.env.MONGO_HOST;
const mdbPort = process.env.MONGO_PORT;
const mdbPassword = process.env.MONGO_PASSWORD;
const mdbUser = process.env.MONGO_USER;

// setup connection string
const mongoUrl = `mongodb://${mdbUser}:${mdbPassword}@${mdbHost}:${mdbPort}/${mdbName}?authSource=admin`;

// connect using mongoose 
db.mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => initial())
    .catch((err) => {
        console.error(err);
        process.exit();
    });

const Role = db.role;
// create rows in roles collection
const initial = () => {
    console.log("Connected, running initial");
    // get estimated doc count
    Role.estimatedDocumentCount((err, count) => {
        // if no roles in db
        if (!err && count === 0) {
            // create user role
            new Role({
                name: "user"
            }).save((err) => {
                if (err) return console.error(err); // should I return?
                console.log("Added 'user' to roles collection");
            });
            // create moderator role
            new Role({
                name: "moderator"
            }).save((err) => {
                if (err) return console.error(err);
                console.log("Added 'moderator' to roles collection");
            });
            // create admin role
            new Role({
                name: "admin"
            }).save((err) => {
                if (err) return console.log(err);
                console.log("Added 'admin' to roles collection");
            });
        }
    });
};

app.get("/", (req, res) => {
    res.json({
        users: ["john", "mary", "sophie"]
    });
});

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if (err) return console.error(err);
    console.log(`Listening (${port})`);
});
