const express = require("express");

const stageCntrl = require("../controllers/stage");

const stageRouter = express.Router();

stageRouter.route("/").post(stageCntrl.addStage);
// officerRouter.route("/:id")
//     .put(officerCntrl.updateOfficerById)
//     .delete(officerCntrl.deleteOfficerById)
stageRouter
  .route("/byFileId/:fileId")
  .get(stageCntrl.getStagebyFileId)
  .put(stageCntrl.updateStagebyFileId);
module.exports = stageRouter;
