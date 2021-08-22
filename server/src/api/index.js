const express = require("express");
const sweaters = require("./sweaters");

const router = express.Router();

router.get("/", (req, res) => res.json({
    message: "/api/v1 route for API"
}));

router.use("/sweaters", sweaters);

module.exports = router;