const db = require("../models/index");
const Officer= db.officers;
const Op = db.Sequelize.Op;
const sequelize= require('sequelize');


const { stages_of_progress_of_files } = require("../models/index");
const stages_of_progress_of_file = require("../models/stages_of_progress_of_file");

const File= db.files;
const Stage= db.stages_of_progress_of_files;


    
exports.addOfficer = (officerToAdd) => {
    return Officer.create(officerToAdd);
};
   
const concatForWhere=(wh,attribute_key ,attribute_value)=>
{    
    if(attribute_value)
        wh[attribute_key] =attribute_value;
}

exports.getOfficersFilterAndSort=(FilterAndSortObg)=>{
    let wh={};
    
    concatForWhere(wh,"managerId",FilterAndSortObg.managerId);

    concatForWhere(wh,"professionUnitId",FilterAndSortObg.professionUnitId);

    concatForWhere(wh,"permissionId",FilterAndSortObg.permissionId);
 
    concatForWhere(wh,"idNumber",FilterAndSortObg.idNumber);

    concatForWhere(wh,"name",FilterAndSortObg.name); 

   if(FilterAndSortObg.numOfDocumentsF)
        wh["numOfDocuments"]= {[Op.gte]:FilterAndSortObg.numOfDocumentsF};

    if(FilterAndSortObg.numOfDocumentsT)
        wh["numOfDocuments"]= {[Op.lte]:FilterAndSortObg.numOfDocumentsT};

    const qry={};
    qry.where= wh;

    if(FilterAndSortObg.sortBy)
        qry.order= [db.sequelize.literal(FilterAndSortObg.sortBy)];

    return Officer.findAll(qry);
};

exports.getOfficersByManagerId=(id)=>{
    console.log(id);
    return Officer.findAll({
        where:{managerId:id},
        include: [{ model: db.profession_units, attributes:['name']}]
    });
};

exports.getOfficersByprofession_unitsId=(id)=>{
    console.log(id);
    return Officer.findAll({
        where:{professionUnitId:id},
        //include: [{ model: db.profession_units, attributes:['name']}]
    });
};

exports.updateOfficerById=(id,officerToUpdate)=>{
    console.log(id);
    console.log(officerToUpdate);
    return  Officer.update(officerToUpdate, {
        where: { idOfficer: id }
      })
};


exports.deleteOfficerById=(id)=>{
    return  Officer.destroy({
      where: { idOfficer: id }
    })
}

exports.getNumOfDocuments = async(id) => {
    const ts = Date.now();
    const date_ob = new Date(ts);
    const cyear = date_ob.getFullYear();
    const cmonth = date_ob.getMonth()+1;
  
    let officer=await Officer.findAll({ where: { idofficer: id } });
    numOfficer=officer[0].numOfDocuments;

    console.log(numOfficer);

    const used= await Stage.count({ 
      include:[{model:db.statuses, where:{name:'בבדיקה ע"י הפקיד'}},
              {model:db.files,  attributes: [], where:{officerId:id}}      
              ],
      where: {[Op.and]:[sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), cyear),sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), cmonth)]}    
    });
    
    console.log(used);
    console.log(numOfficer-used);

    return (numOfficer-used);
  };
      