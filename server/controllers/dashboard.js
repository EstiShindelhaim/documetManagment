const dashDal=require('../dal/dashboard');
const file = require('../models/file');


exports.getLastFiles = (req, res) => {
    console.log("num", req.params.num, "manager",  req.params.managerId);
    dashDal.getLastFiles(req.params.num, req.params.managerId)
    .then(data => {
        // {
        //     "idstages_of_progress_of_file": 286,
        //     "fileId": 361,
        //     "statusId": 2,
        //     "date": "2022-04-16",
        //     "file.name": "יוסי",
        //     "file.result": 1,
        //     "file.remarks": "",
        //     "file.officer.idofficer": 7,
        //     "file.officer.name": "לאה כהן",
        //     "status.name": "נבדק ע\"י הפקיד"
        // }
        console.log(data);
        data=data.map((e)=>{return{"idfile":e.fileId,
                                    "statusId":e.statusId,
                                    "date":e.date,
                                    "name":e["file.name"],
                                    "result":e["file.result"],
                                    "remarks":e["file.remarks"],
                                    "idofficer":e["file.officer.idofficer"],
                                    "statusName":e["status.name"],
                                    "officerName":e["file.officer.name"]}});
        console.log(data);
        res.send(data);
        })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving files."
    });
    })
    };

exports.getRGGrafOfFilesByYear = (req, res) => {
    const id = req.params.managerId;
    dashDal.getRGGrafOfFilesByYear(id)
    .then(data => {
        res.send(data);
        })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving data."
    });
    })
    
};

exports.getRGGrafOfFilesByMonth = (req, res) => {
    const id = req.params.managerId;
    dashDal.getRGGrafOfFilesByMonth(id)
    .then(data => {
        res.send(data);
        })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving data."
    });
    })
    
};
exports.getFilesBy2month = async(req, res) => {
    const id = req.params.managerId;
    try{
        const data=await dashDal.getFilesBy2month(id);
        if (data) {
            res.send({'num':data});
        } 
        else {
            res.status(404).send({
            message: `Cannot find files By two month for manager with id= ${id}.`,
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: `Error retrieving files By two month for manager with id= ${id}.`,
        });
    }; 
};

exports.getFilesBy2year = async(req, res) => {
    const id = req.params.managerId;
    try{
        const data=await dashDal.getFilesBy2year(id);
        if (data) {
            res.send({'num':data});
        } 
        else {
            res.status(404).send({
            message: `Cannot find files By two year for manager with id= ${id}.`,
            });
        }
    }
    catch(err){
        res.status(500).send({
            message: `Error retrieving files By two year for manager with id= ${id}.`,
        });
    }; 
};

exports.getGrafOfFilesByYear = (req, res) => {
    const id = req.params.managerId;
    dashDal.getGrafOfFilesByYear(id)
    .then(data => {
        res.send(data);
        })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving data."
    });
    })
    
};

exports.getGrafOfFilesByMonth = (req, res) => {
    const id = req.params.managerId;
    dashDal.getGrafOfFilesByMonth(id)
    .then(data => {
        res.send(data);
        })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving data."
    });
    })
    
};

  


