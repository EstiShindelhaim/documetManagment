const express = require("express");

const officerCntrl = require("../controllers/officer");

const officerRouter = express.Router();

officerRouter.route("/")
    .post(officerCntrl.addOfficer)
officerRouter.route("/getOfficers")
    .post(officerCntrl.getOfficersFilterAndSort)
officerRouter.route("/:id")
    .put(officerCntrl.updateOfficerById)
    .delete(officerCntrl.deleteOfficerById)
officerRouter.route("/byManager/:managerId")//לא צריך    
    .get(officerCntrl.getOfficersByManagerId )
officerRouter.route("/numOfDocuments/:idofficer")  
    .get(officerCntrl.getNumOfDocuments )

module.exports = officerRouter;