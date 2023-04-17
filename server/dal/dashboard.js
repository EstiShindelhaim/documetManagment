const { stages_of_progress_of_files } = require("../models/index");
const db = require("../models/index");
const stages_of_progress_of_file = require("../models/stages_of_progress_of_file");

const File = db.files;
const Stages = db.stages_of_progress_of_files;

const Op = db.Sequelize.Op;
const sequelize = require('sequelize');

exports.getLastFiles = (numOfFiles, managerId) => {
  return Stages.findAll(
    {
      include: [
        { 
          model: db.files, 
          attributes: ['name','result','remarks'], 
          include: { model: db.officers, attributes:['name'], where: { 'managerId': managerId } } 
        }, 
        { model: db.statuses, attributes: ['name'], where: { name: 'נבדק ע"י הפקיד' } }
      ],
      raw: true,
      limit: parseInt(numOfFiles),
      order: [['date', 'DESC']]
    }
  )
};

exports.getRGGrafOfFilesByYear = (id) => {
  return Stages.findAll({
    attributes: [
      [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
      [sequelize.fn('SUM', sequelize.literal('CASE WHEN result = 0 THEN 1 ELSE 0 END')), 'red'],
      [sequelize.fn('SUM', sequelize.literal('CASE WHEN result = 1 THEN 1 ELSE 0 END')), 'green'],

    ],
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    raw: true,
    group: [sequelize.fn('YEAR', sequelize.col('date'))],
  })

};

exports.getRGGrafOfFilesByMonth = (id) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let year = date_ob.getFullYear();
  console.log(year);

  return Stages.findAll({
    attributes: [
      [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
      [sequelize.fn('SUM', sequelize.literal('CASE WHEN result = 0 THEN 1 ELSE 0 END')), 'red'],
      [sequelize.fn('SUM', sequelize.literal('CASE WHEN result = 1 THEN 1 ELSE 0 END')), 'green'],

    ],
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
    raw: true,
    group: [sequelize.fn('MONTH', sequelize.col('date'))],
  })
};
exports.getFilesBy2month = async (id) => {
  const ts = Date.now();
  const date_ob = new Date(ts);
  const cyear = date_ob.getFullYear();
  const cmonth = date_ob.getMonth() + 1;

  let lmonth = cmonth - 1;
  let lyear = cyear;
  if (lmonth == 0) {
    lmonth = 12;
    lyear -= 1;

  }
  console.log(cyear);
  console.log(cmonth);
  console.log(lyear);
  console.log(lmonth);

  const current = await Stages.count({
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    //where:{'date':{[Op.startsWith]:{ [Op.any]: [cyear+"-"+cmonth, lyear+"-"+lmonth]}},  
    where: { [Op.and]: [sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), cyear), sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), cmonth)] }
  })
  console.log(current);
  const last = await Stages.count({
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    //where:{'date':{[Op.startsWith]:{ [Op.any]: [cyear+"-"+cmonth, lyear+"-"+lmonth]}},  
    where: { [Op.and]: [sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), lyear), sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), lmonth)] }
  })
  console.log(last);
  return { current: current, last: last }

};

exports.getFilesBy2year = async (id) => {
  const ts = Date.now();
  const date_ob = new Date(ts);
  const cyear = date_ob.getFullYear();
  const lyear = cyear - 1

  console.log(cyear);
  console.log(lyear);

  const current = await Stages.count({
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    //where:{'date':{[Op.startsWith]:{ [Op.any]: [cyear+"-"+cmonth, lyear+"-"+lmonth]}},  
    where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), cyear),
  })
  console.log(current);
  const last = await Stages.count({
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    //where:{'date':{[Op.startsWith]:{ [Op.any]: [cyear+"-"+cmonth, lyear+"-"+lmonth]}},  
    where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), lyear),
  })
  console.log(last);
  return { current: current, last: last }

};

exports.getGrafOfFilesByYear = (id) => {
  return Stages.findAll({
    attributes: [
      [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
      [sequelize.fn('COUNT', sequelize.literal('idstages_of_progress_of_file')), 'count']
    ],
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    raw: true,
    group: [sequelize.fn('YEAR', sequelize.col('date'))],
  })

};

exports.getGrafOfFilesByMonth = (id) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let year = date_ob.getFullYear();

  return Stages.findAll({
    attributes: [
      [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
      [sequelize.fn('COUNT', sequelize.literal('idstages_of_progress_of_file')), 'count']
    ],
    include: [{ model: db.files, attributes: [], include: { model: db.officers, attributes: [], where: { 'managerId': id } } },
    { model: db.statuses, attributes: [], where: { name: 'נבדק ע"י הפקיד' } }
    ],
    where: sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year),
    raw: true,
    group: [sequelize.fn('MONTH', sequelize.col('date'))],
  })
};










