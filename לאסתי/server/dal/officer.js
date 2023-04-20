const db = require("../models/index");
const Officer= db.officers;
const Op = db.Sequelize.Op;
const Stage=db.stages_of_progress_of_files;
const sequelize= require('sequelize');


exports.getOfficerByID=(id)=>{

    console.log(db);
    return  Officer.findByPk(id);

};

exports.getOfficerByIdNumber= (id)=>
{
  console.log("getOfficerByIdNumber");
  return  Officer.findOne({where:{idNumber:id}});
}


exports.updateOfficer=(id,officerToUpdate)=>{
    return Officer.update(officerToUpdate, {

        where: {idofficer: id }

      })

};
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
