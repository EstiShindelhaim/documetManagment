const express = require("express");

const resultCntrl = require("../controllers/document_result");

const resultRouter = express.Router();
console.log("route");
resultRouter.route("/")
    .post(resultCntrl.addResult)
resultRouter.route("/byDocument/:documentId")
    .get(resultCntrl.getResultsByDocumentId)
module.exports = resultRouter;