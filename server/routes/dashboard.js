const express = require("express");

const dashCntrl = require("../controllers/dashboard");

const dashRouter = express.Router();

dashRouter.route("/lastFiles/:num/:managerId")
    .get(dashCntrl.getLastFiles)

dashRouter.route("/RGFilesByYear/:managerId")
    .get(dashCntrl.getRGGrafOfFilesByYear)
dashRouter.route("/RGFilesByMonth/:managerId")
    .get(dashCntrl.getRGGrafOfFilesByMonth)

dashRouter.route("/filesBy2month/:managerId")
    .get(dashCntrl.getFilesBy2month)
dashRouter.route("/filesBy2year/:managerId")
    .get(dashCntrl.getFilesBy2year)
    
dashRouter.route("/filesByYear/:managerId")
    .get(dashCntrl.getGrafOfFilesByYear)
dashRouter.route("/filesByMonth/:managerId")
    .get(dashCntrl.getGrafOfFilesByMonth)
    
dashRouter.route("/active/:managerId")
    .get(dashCntrl.getActiveFiles)
dashRouter.route("/fake/:managerId")
    .get(dashCntrl.getFakeFiles)
dashRouter.route("/check/:managerId")
    .get(dashCntrl.getUnderCheckFiles)
dashRouter.route("/checked/:managerId")
    .get(dashCntrl.getCheckedFiles)


module.exports = dashRouter;
