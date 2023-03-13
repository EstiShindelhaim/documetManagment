const express = require("express");

const documentCntrl = require("../controllers/document");

const documentRouter = express.Router();

documentRouter.route("/")
    .get(documentCntrl.getAllDocuments)
    .post(documentCntrl.addDocument)

    documentRouter.route("/:id")
    .get(documentCntrl.getDocumentById)
  .put(documentCntrl.updateDocumentById)
    .delete(documentCntrl.deleteDocumentById)
    documentRouter.route("/byFile/:fileId")
       .get(documentCntrl.getDoucumentsByFileId)
module.exports = documentRouter;