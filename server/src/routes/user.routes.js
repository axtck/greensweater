const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

console.log(authJwt);

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // user routes
    // all access
    app.get(
        "/api/test/all",
        controller.allAccess
    );

    // users
    app.get(
        "/api/test/user",
        [authJwt.verifyToken], // verify token
        controller.userBoard
    );

    // moderators
    app.get(
        "/api/test/moderator",
        [authJwt.verifyToken, authJwt.isModerator], // verify token and check role
        controller.moderatorBoard
    );

    // admins
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin], // verify token and check role
        controller.adminBoard
    );
};