const documentDal=require('../dal/document');


exports.getAllDocuments=(req, res)=>{
   documentDal.getAllDocuments()
    .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Documents."
        });
        });
}

exports.addDocument=(req, res)=>{
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  documentDal.addDocument(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Document."
      });
    });
}
exports.deleteDocumentById=(req, res)=>{
  const id = req.params.id;
  documentDal.deleteDocumentById(id)
 
    .then(num => {
      if (num == 1) {
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
exports.getDoucumentsByFileId=(req, res)=>{
  const fileId = req.params.fileId;
  documentDal.getDoucumentsByFileId(fileId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Document with fileId=${fileId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Document with fileId=" + fileId
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

exports.getOpenDocumentById = (req, res, next) => {

  //   function getByteArray(filePath){
  //     let fileData = fs.readFileSync(filePath).toString('hex');
  //     let result = []
  //     for (var i = 0; i < fileData.length; i+=2)
  //       result.push('0x'+fileData[i]+''+fileData[i+1])
  //     return result;
  // }

  // result = getByteArray(`${process.env.PATH_FILE}/${req.params.file}/${req.params.document}.pdf`)
  //   res.send(result) 
    const options = { 
      root: `${process.env.PATH_FILE}/${req.params.file}`
  }; 

    const fileName = `${req.params.document}.${req.params.docType}`;
    res.sendFile(fileName, options, function (err) {
        if (err) {
          console.log(err);
            next(err);
        } else { 
          console.log('Sent:', fileName); 
      }
  });
}
