const express = require("express");

const principalCntrl = require("../controllers/principal");

const principalRouter = express.Router();

principalRouter.route("/")
    .get(principalCntrl.getPrincipal)

module.exports = principalRouter;