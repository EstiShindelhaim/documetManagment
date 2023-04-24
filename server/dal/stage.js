const db = require("../models/index");
const Stage = db.stages_of_progress_of_files;
//const Op = db.Sequelize.Op;

exports.addStage = (stageToAdd) => {
  return Stage.create(stageToAdd);
};

// const concatForWhere=(wh,attribute_key ,attribute_value)=>
// {
//     if(attribute_value)
//         wh[attribute_key] =attribute_value;
// }

// exports.getOfficersFilterAndSort=(FilterAndSortObg)=>{
//     let wh={};

//     concatForWhere(wh,"managerId",FilterAndSortObg.managerId);

//     concatForWhere(wh,"professionUnitId",FilterAndSortObg.professionUnitId);

//     concatForWhere(wh,"permissionId",FilterAndSortObg.permissionId);

//     concatForWhere(wh,"idNumber",FilterAndSortObg.idNumber);

//     concatForWhere(wh,"name",FilterAndSortObg.name);

//    if(FilterAndSortObg.numOfDocumentsF)
//         wh["numOfDocuments"]= {[Op.gte]:FilterAndSortObg.numOfDocumentsF};

//     if(FilterAndSortObg.numOfDocumentsT)
//         wh["numOfDocuments"]= {[Op.lte]:FilterAndSortObg.numOfDocumentsT};

//     const qry={};
//     qry.where= wh;

//     if(FilterAndSortObg.sortBy)
//         qry.order= [db.sequelize.literal(FilterAndSortObg.sortBy)];

//     return Officer.findAll(qry);
// };

exports.getStagebyFileId = (id) => {
  return Stage.findAll({
    where: { fileId: id },
    include: { model: db.statuses, attributes: ['name'] }
  });
};

exports.updateStagebyFileId = (fileId, stageToUpdate) => {
  return Stage.update(stageToUpdate, {
    where: { fileId: fileId },
  });
};

// exports.deleteOfficerById=(id)=>{
//     return  Officer.destroy({
//       where: { idOfficer: id }
//     })
// }
