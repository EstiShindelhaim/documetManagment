const db = require("../models/index");
const officer = require("../models/officer");
const Manager = db.managers;
const Officer = db.officers;


const { stages_of_progress_of_files } = require("../models/index");
const stages_of_progress_of_file = require("../models/stages_of_progress_of_file");

const File = db.files;
const Stage = db.stages_of_progress_of_files;

const Op = db.Sequelize.Op;
const sequelize = require('sequelize');

exports.getManagerByIdNumber = (id) => {
  return Manager.findAll({ where: { idNumber: id } });
};

exports.getManagerById = (id) => {
  //return Manager.findByPk(id);
  return Manager.findAll({ where: { idmanager: id } });
};


exports.createManager = (officerToAdd) => {
  return Manager.create(officerToAdd);
};
exports.updateManagerById = (id, managerToUpdate) => {
  return Manager.update(managerToUpdate, {
    where: { idmanager: id },
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getNumOfDocumentsForManager = async (id) => {
  const ts = Date.now();
  const date_ob = new Date(ts);
  const cyear = date_ob.getFullYear();
  const cmonth = date_ob.getMonth() + 1;

  let manager = await Manager.findAll({ where: { idmanager: id } });
  numManager = manager[0].numOfDocumentsForManager;
  console.log(numManager);
  const used = await Stage.count({
    include: [{ model: db.statuses, where: { name: 'בבדיקה ע"י המנהל' } },
    { model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { managerId: id },} }
    ],
    where: { [Op.and]: [sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), cyear), sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), cmonth)] }
  });

  console.log(used);
  console.log(numManager - used);
  return (numManager - used);
};

exports.getNumOfDocumentsForOfficer = async (id) => {
  let manager = await Manager.findAll({ where: { idmanager: id } });
  numManager = manager[0].numOfDocumentsForOfficer;
  const sumOfficers = await Officer.sum('numOfDocuments', { where: { managerId: id } });
  console.log(numManager - sumOfficers);
  return (numManager - sumOfficers);
};

