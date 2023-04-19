const db = require("../models/index");
const Status = db.statuses;

exports.getStatuses = () => {
    return Status.findAll();
  };