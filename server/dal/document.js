const db = require("../models/index");
const Document= db.documents;

   
    
exports.addDocument = (documentToAdd) => {

    return Document.create(documentToAdd);
};
    
exports.getDocumentById=(id)=>{
    qry={}
    qry.where={iddocument:id}
    qry.include=[{model:db.languages,  attributes: ['name'] }];
    qry.raw=true;
    return Document.findAll(qry);    
};
exports.getDoucumentsByFileId = (id) => {
    // qry = {}
    // qry.where={fileId:id}
    // qry.include=[{model:db.languages,  attributes: ['name'] }];
    // qry.raw=true;
    // return Document.findAll(qry); 
    console.log("iiiiiiiiiiiiiiiiiiiiiiid", id);
    return Document.findAll({
        where: { fileId: id },
        include: [{ model: db.languages, attributes: ['name'] }]
    });
};
exports.getAllDocuments= ()=>{
    qry={}
    qry.where={}
    qry.include=[{model:db.languages,  attributes: ['name'] }];
    qry.raw=true;
    return Document.findAll(qry); 
};
exports.updateDocumentById=(id,documentToUpdate)=>{
    return  Document.update(documentToUpdate, {
        where: { iddocument: id }
      })
};

// exports.closeFile=(req, res)=>{//????
//     res.send("closeReques");
// }

exports.deleteDocumentById=(id)=>{
    return  Document.destroy({
      where: { iddocument: id }
    })
}
      