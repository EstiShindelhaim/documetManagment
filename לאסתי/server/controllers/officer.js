const officerDal= require('../dal/officer');
const officer = require('../models/officer');

exports.login=(req, res) =>
{
  const id =req.params.id;
  const password= req.params.password;
    officerDal.getOfficerByIdNumber(id)
    .then(data => {
        if (data) {
          console.log(data);
          if(data.password==password)
            res.send(data);
          else
            res.status(404).send({
              message: `Cannot find Officer with id=${id} and password ${password}.`
              })
        } 
        else {
            res.status(404).send({
            message: `Cannot find Officer with id=${id} and password ${password}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving officer with id=" + id
        });
    });
}

exports.getOfficerByID=(req, res)=>{
    const id =req.params.id;
    officerDal.getOfficerByID(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find Officer with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving officer with id=" + id
        });
    });
}

exports.updateOfficer=(req, res)=>{
    const id=req.params.id;
    officerDal.updateOfficer(id ,req.body)
    .then(num => {
        if (num == 1) {
          res.send({
            message: "officer was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update officer with id=${id}. Maybe officer was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating officer with id=" + id
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