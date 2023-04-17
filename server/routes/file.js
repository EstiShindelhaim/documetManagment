const express = require("express");

const fileCntrl = require("../controllers/file");

const fileRouter = express.Router();

fileRouter.route("/")
    .post(fileCntrl.addFile)

fileRouter.route("/:id")
    .get(fileCntrl.getFileByID)
    .put(fileCntrl.updateFile)
    .delete(fileCntrl.deleteFileByID)
fileRouter.route("/byManager/:managerId")
    .get(fileCntrl.getFilesByManagerId)
fileRouter.route("/passedToManager/:managerId")
    .get(fileCntrl.getFilesPassedToManager)
fileRouter.route("/getfiles")
    .post(fileCntrl.getAllFiles)
fileRouter.route("/getfilesPassedManager")
    .post(fileCntrl.getFilesPassedManager)


module.exports = fileRouter;
