const express = require("express");

const managerCntrl = require("../controllers/manager");

const managerRouter = express.Router();

managerRouter.route("/login/:idNumber/:password")
.get(managerCntrl.login)
managerRouter.route("/").post(managerCntrl.createManager)
managerRouter.route("/:id")
    .get(managerCntrl.getManagerById)
  .put(managerCntrl.updateManagerById)
managerRouter.route("/numOfDocumentsForManager/:idmanager")
.get(managerCntrl.getNumOfDocumentsForManager)
managerRouter.route("/numOfDocumentsForOfficer/:idmanager")
.get(managerCntrl.getNumOfDocumentsForOfficer)

module.exports = managerRouter;