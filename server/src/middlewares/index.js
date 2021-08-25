const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

// export middlewares
module.exports = {
    authJwt,
    verifySignUp
};
