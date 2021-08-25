const express = require("express");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

// user routes
// all access
router.get(
    "/all",
    controller.allAccess
);

// users
router.get(
    "/user",
    [authJwt.verifyToken], // verify token
    controller.userBoard
);

// moderators
router.get(
    "/moderator",
    [authJwt.verifyToken, authJwt.isModerator], // verify token and check role
    controller.moderatorBoard
);

// admins
router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin], // verify token and check role
    controller.adminBoard
);

module.exports = router;