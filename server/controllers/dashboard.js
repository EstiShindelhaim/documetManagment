const dashDal = require('../dal/dashboard');
const file = require('../models/file');


exports.getLastFiles = (req, res) => {
    dashDal.getLastFiles(req.params.num, req.params.managerId)
        .then(data => {
            data = data.map((e) => {
                return {
                    "idfile": e.fileId,
                    "statusId": e.statusId,
                    "date": new Date(e.date).toLocaleDateString(),
                    "name": e["file.name"],
                    "result": e["file.result"],
                    "remarks": e["file.remarks"],
                    "idofficer": e["file.officer.idofficer"],
                    "officerName": e["file.officer.name"],
                    "statusName": e["file.status.name"]
                }
            });
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
exports.getFilesBy2month = async (req, res) => {
    const id = req.params.managerId;
    try {
        const data = await dashDal.getFilesBy2month(id);
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find files By two month for manager with id= ${id}.`,
            });
        }
    }
    catch (err) {
        res.status(500).send({
            message: `Error retrieving files By two month for manager with id= ${id}.`,
        });
    };
};

exports.getFilesBy2year = async (req, res) => {
    const id = req.params.managerId;
    try {
        const data = await dashDal.getFilesBy2year(id);
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot find files By two year for manager with id= ${id}.`,
            });
        }
    }
    catch (err) {
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

exports.getActiveFiles = (req, res) => {

    dashDal.getActiveFiles(req.params.managerId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data num of active files."
            });
        })

};


exports.getFakeFiles = (req, res) => {

    dashDal.getFakeFiles(parseInt(req.params.managerId))
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data num of fake files."
            });
        })

};


exports.getUnderCheckFiles = (req, res) => {

    dashDal.getUnderCheckFiles(parseInt(req.params.managerId))
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data num of under check files."
            });
        })

};

exports.getCheckedFiles = (req, res) => {

    dashDal.getCheckedFiles(parseInt(req.params.managerId))
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data num of checked files."
            });
        })

};


