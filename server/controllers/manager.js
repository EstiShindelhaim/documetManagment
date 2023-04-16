const managerDal = require("../dal/manager");

exports.login = (req, res) => {
  const idNumber = req.params.idNumber;
  const password = req.params.password;
  managerDal
    .getManagerByIdNumber(idNumber)
    .then((data) => {
      if (data) {
        if(data[0].password==password)
          res.send({user:data[0]});
        else
        res.send({
          message: `The password:${password} not correct for id number: ${idNumber}`,
        });
      } else {
        res.status(404).send({
          message: `Cannot find Manager with id= ${idNumber}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Manager with id= ${id}.`,
      });
    });
};

exports.getManagerById = (req, res) => {
  const id = req.params.id;
  managerDal
    .getManagerById(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Manager with id= ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Manager with id= ${id}.`,
      });
    });
};
exports.createManager = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  managerDal
    .createManager(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager.",
      });
    });
};
exports.updateManagerById = (req, res) => {
  const id = req.params.id;
  managerDal
    .updateManagerById(id, req.body)
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "manager was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update manager with id= ${id}. Maybe manager was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating manager with id= ${id}.`,
      });
    });
};

exports.getNumOfDocumentsForManager = async(req, res) => {
  const id = req.params.idmanager;
  try{
    const data=await managerDal.getNumOfDocumentsForManager(id);
    if (data) {
      res.send({'num':data});
    } 
    else {
      res.status(404).send({
        message: `Cannot find number of documents for manager with id= ${id}.`,
      });
    }
  }
  catch(err){
    res.status(500).send({
      message: `Error retrieving number of documents for manager with id= ${id}.`,
    });
  };
};
exports.getNumOfDocumentsForOfficer = async(req, res) => {
  const id = req.params.idmanager;
  console.log("pppppppppppppppppppppppppppppppppppppppppp");
  try{
    const data=await managerDal.getNumOfDocumentsForOfficer(id);
    if (data) {
      res.send({'num':data});
    } 
    else {
      res.status(404).send({
        message: `Cannot find number of documents for officer of manager with id= ${id}.`,
      });
    }
  }
  catch(err){
    res.status(500).send({
      message: `Error retrieving number of documents for officer of manager with id= ${id}.`,
    });
  };
  
};
