const express = require("express");

const officerCntrl = require("../controllers/officer");

const officerRouter = express.Router();


officerRouter.route("/:id")
    .get(officerCntrl.getOfficerByID)
    .put(officerCntrl.updateOfficer);

officerRouter.route("/:id/:password")
    .get(officerCntrl.login)

officerRouter.route("/numOfDocuments/:idofficer")  
    .get(officerCntrl.getNumOfDocuments )
module.exports = officerRouter;