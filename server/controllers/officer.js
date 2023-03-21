
const officerDal= require('../dal/officer');
const bcrypt= require('bcrypt')

exports.addOfficer=async(req, res)=>{
  console.log("req.body");
  console.log(req.body);
  const {managerId, professionUnitId, idNumber ,name,password,mail,numOfDocuments} = req.body
  if (!managerId || !idNumber || !password || !numOfDocuments) {// Confirm data
    return res.status(400).json({ message: 'All fields are required' })
  }
 
  const hashedPwd = await bcrypt.hash(password, 10)
  const userObject = {managerId, professionUnitId, idNumber ,name,password:hashedPwd,mail,numOfDocuments}
  console.log("userObject");
  console.log(userObject);
    
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  officerDal.addOfficer(userObject)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Officer."
      });
    });
 }
 
 exports.getOfficersFilterAndSort=(req, res)=>{
  console.log("dddddddddddddddddddddddddddddddd");
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  officerDal.getOfficersFilterAndSort(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while filter and sort the Officer."
      });
    });

 }

 exports.getOfficersByManagerId=(req, res)=>{
  console.log(req.params.managerId);
    const managerId =req.params.managerId ;
    officerDal.getOfficersByManagerId(managerId)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find officer with managerId= ${managerId}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error retrieving officer with managerId= ${managerId}.`
        });
      });
  }
  exports.updateOfficerById=(req, res)=>{
    const id = req.params.id;
    officerDal.updateOfficerById(id ,req.body)
      .then(num => {
        if (num == 1) {
          res.send({
            message: "officer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update officer with id= ${id}. Maybe officer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error updating officer with id= ${id}.`
        });
      }); 
  }


 exports.deleteOfficerById=(req, res)=>{
   const id = req.params.id;
   officerDal.deleteOfficerById(id)
  
     .then(num => {
       if (num == 1) {
         res.send({
           message: "officer was deleted successfully!"
         });
       } else {
         res.send({
           message: `Cannot delete officer with id. Maybe officer was not found!`
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: `Could not delete officer with id= ${id}`
       });
     });
 }

 exports.getNumOfDocuments = async(req, res) => {
  const id = req.params.idofficer;
  try{
    const data=await officerDal.getNumOfDocuments(id);
    if (data) {
      res.send({'num':data});
    } 
    else {
      res.status(404).send({
        message: `Cannot find number of documents for officer with id= ${id}.`,
      });
    }
  }
  catch(err){
    res.status(500).send({
      message: `Error retrieving number of documents for officer with id= ${id}.`,
    });
  };
};

 



