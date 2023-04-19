const express = require("express");

const atatusCntrl = require("../controllers/status");

const statusRouter = express.Router();

statusRouter.route("/")
  .get(atatusCntrl.getStatuses)

module.exports = statusRouter;
