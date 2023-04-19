const ProfessionDal = require("../dal/profession_unit");
const managerDal = require("../dal/manager");

exports.addProfessionUnit = async(req, res) => {
    const id=req.params.managerId;
    let manager;
    try{
      const data= await managerDal.getManagerById(id);
      if (data) {
        manager=data;
      } 
      else {
        res.status(404).send({
          message: `Cannot find manager with id= ${id}.`,
        });
      }
    }
    catch(err){
      res.status(500).send({
        message: `Error retrieving manager with id= ${id}.`,
      });
    };

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }    
  let obj=req.body
  obj.companyId=manager[0].companyId;
  ProfessionDal
    .addProfessionUnit(obj)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the profession unit.",
      });
    });
};

exports.getProfessionUnitByManager = async(req, res) => {
  let id = req.params.managerId;
  let manager;
  try{
    const data= await managerDal.getManagerById(id);
    if (data) {
      manager=data;
      console.log(data);
    } 
    else {
      res.status(404).send({
        message: `Cannot find manager with id= ${id}.`,
      });
    }
  }
  catch(err){
    res.status(500).send({
      message: `Error retrieving manager with id= ${id}.`,
    });
  };
  id=manager[0].companyId;
  ProfessionDal
    .getProfessionUnitByCompany(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find profession unit with id= ${fileId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving stage with profession unit= ${fileId}.`,
      });
    });
};

exports.updateProfessionUnit = (req, res) => {
  const id = req.params.id;
  ProfessionDal
    .updateProfessionUnit(id, req.body)
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "profession unit was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update profession unit with id= ${id}. Maybe profession unit was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating stage with id= ${id}.`,
      });
    });
};


exports.deleteProfessionUnitById=(req, res)=>{
  const id = req.params.id;
  console.log("id",id);
  ProfessionDal.deleteProfessionUnitById(id)
 
    .then(num => {
      if (num == 1) {
        res.send({
          message: "professionUnit was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete professionUnit with id. Maybe professionUnit was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete professionUnit with id= ${id}`
      });
    });
}
