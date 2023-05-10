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
     documentRouter.route("/:file/:document/:docType")
       .get(documentCntrl.getOpenDocumentById)
module.exports = documentRouter;