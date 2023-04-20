const express = require("express");

const documentCntrl = require("../controllers/document");

const documentRouter = express.Router();

documentRouter.route("/")
    .post(documentCntrl.addDocuments)

documentRouter.route("/:id")
    .get(documentCntrl.getDocumentById)
    .put(documentCntrl.updateDocumentById)
    .delete(documentCntrl.deleteDocumentById) //למחוק את מי שמקושר

documentRouter.route("/file/:fileId")
    .get(documentCntrl.getDocumentsByFile)

module.exports = documentRouter;