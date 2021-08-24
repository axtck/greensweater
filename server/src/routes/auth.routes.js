const express = require("express");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

const router = express.Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// auth routes
// sign up
router.post(
    "/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

// sign in
router.post(
    "/signin",
    controller.signin
);

module.exports = router;