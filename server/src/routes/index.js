const express = require("express");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

const router = express.Router();

// tmp
router.get("/dd", (req, res) => {
    res.json({
        users: ["john", "aldo"]
    });
});

// use routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;