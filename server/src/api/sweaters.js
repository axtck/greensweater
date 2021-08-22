const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.json({
    message: "sweaters route for API"
}));

module.exports = router;