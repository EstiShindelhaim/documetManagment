const documentDal=require('../dal/document');
const {deleteDocument, uploadDocument }=require('../service/document')
exports.addDocuments=(req, res)=>{

  try
  {
    this.addDocuments2(req.body.documents, 38)
    res.status(201).json({ message: 'created documents' })
  }
  catch(err)
  {
    res.status(400).json({ message: `can't create documents. ${err}` })
  }
}

exports.addDocuments2=(documents, fileId)=>
{
  console.log(documents);
    docsToCraete= documents.map((doc)=> {return {fileId: fileId, name: doc.name}})
    documentDal.addDocument(docsToCraete)
    .then(data => {
        if(!data)
        {
          throw new Error("can't add document to DB")
        }
        console.log(data);

    documents.forEach(doc => {
      const type= doc.document.slice(4, doc.document.indexOf(';'));
        uploadDocument(doc.document, doc.name, type,fileId );
      });

  });
  
}

exports.updateDocumentById=(req, res)=>{
  const id = req.params.id;
  documentDal.updateDocumentById(id ,req.body)
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Document was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Document with id=" + id
      });
    }); 


}

exports.getDocumentsByFile=(req, res)=>{
  const fileId = req.params.fileId;
  documentDal.getDocumentsByFile(fileId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Document with fileId=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Document with fileId=" + id
      });
    });
}

exports.getDocumentById=(req, res)=>{
  const id = req.params.id;
  documentDal.getDocumentById(id)
 
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        console.log(data);
        res.status(404).send({
          message: `Cannot find Document with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Document with id=" + id
      });
    });
}


exports.deleteDocumentById=async(req, res)=>{
  const id = req.params.id;
  const document=await documentDal.getDocumentById(id)
  documentDal.deleteDocumentById(id)
   
    .then(num => {
      if (num == 1) {
        deleteDocument(document);
        res.send({
          message: "Document was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id
      });
    });


}