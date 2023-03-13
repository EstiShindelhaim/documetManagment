const express = require("express");

const dashCntrl = require("../controllers/dashboard");

const dashRouter = express.Router();

dashRouter.route("/getRGFilesByYear/:managerId")
    .get(dashCntrl.getRGGrafOfFilesByYear)
dashRouter.route("/getRGFilesByMonth/:managerId")
    .get(dashCntrl.getRGGrafOfFilesByMonth)
dashRouter.route("/getFilesBy2month/:managerId")
    .get(dashCntrl.getFilesBy2month)
dashRouter.route("/getFilesBy2year/:managerId")
    .get(dashCntrl.getFilesBy2year)
dashRouter.route("/getFilesByYear/:managerId")
    .get(dashCntrl.getGrafOfFilesByYear)
dashRouter.route("/getFilesByMonth/:managerId")
    .get(dashCntrl.getGrafOfFilesByMonth)
// dashRouter.route("/:num")
//     .get(dashCntrl.getLastFiles)

module.exports = dashRouter;
