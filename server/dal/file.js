const { statuses } = require("../models/index");
const db = require("../models/index");

const File= db.files;

const Op = db.Sequelize.Op;
const Stages = db.stages_of_progress_of_files;

exports.addFile = (fileToAdd) => {

    return File.create(fileToAdd);

};

exports.getFileByID=(id)=>{
    qry={}
    qry.where={idfile:id}
    qry.include=[{model:db.statuses,  attributes: ['name'] },
    {model:db.officers,  attributes: ['name'] }];
    qry.raw=true;
    return File.findAll(qry);

};

exports.getFilesByManagerId=(id)=>{
    return File.findAll({
        include:[{model:db.statuses,  attributes: ['name'], where:{'name':{[Op.ne]: 'נסגר ע"י המנהל'}}},
        {model:db.officers, attributes: ['name'] },
        {model:db.officers, attributes: [], where:{'managerId':id}},
        // {model:Stages, attributes: ['date'] ,include:{model:db.statuses,  attributes: [], where:{'name': 'נבדק ע"י הפקיד'}}}
    ]
    });
};

exports.getFilesPassedToManager=(id)=>{
    return File.findAll({
        include:[{model:db.statuses,  attributes: ['name'], where:{'name': 'הועבר למנהל'}},
        {model:db.officers, attributes: ['name'] },
        {model:db.officers, attributes: [], where:{'managerId':id}},
        // {model:Stages, attributes: ['date']}
    ]
    });
};
const concatForWhere=(wh,attribute_key ,attribute_value)=>
{    
    if(attribute_value)

        wh=wh[attribute_key] =attribute_value;
}

exports.getAllFiles= (filterParams)=>{


    let wh={};

    concatForWhere(wh,"statusId",filterParams.statusId);

    concatForWhere(wh,"urgency",filterParams.urgency);

    concatForWhere(wh,"IDnumberOfApplicant",filterParams.IDnumberOfApplicant);
 
    concatForWhere(wh,"result",filterParams.result);

    concatForWhere(wh,"officerId",filterParams.officerId); 
    
   if(filterParams.ApplicationSubmissionDateS)
        wh["ApplicationSubmissionDate"]= {[Op.gte]:filterParams.ApplicationSubmissionDateS};

    if(filterParams.ApplicationSubmissionDateE)
        wh["ApplicationSubmissionDate"]= {[Op.lte]:filterParams.ApplicationSubmissionDateE};

    const qry={};
    qry.where= wh;

    if(filterParams.sortBy)
        qry.order= [db.sequelize.literal(filterParams.sortBy)];

        //[sequelize.literal('user.name'), 'author']
    qry.include=[{model:db.statuses,  attributes: ['name'] , where:{'name':{[Op.ne]: 'נסגר ע"י המנהל'}}},
                 {model:db.officers, attributes: ['managerId'], where:{'managerId':filterParams.managerId}},
                 {model:db.officers,  attributes: ['name'] }
                ];
    qry.raw=true;
    return File.findAll(qry);
};

exports.getFilesPassedManager= (filterParams)=>{

    let wh={};

    concatForWhere(wh,"urgency",filterParams.urgency);

    concatForWhere(wh,"IDnumberOfApplicant",filterParams.IDnumberOfApplicant);
 
    concatForWhere(wh,"result",filterParams.result);

    concatForWhere(wh,"officerId",filterParams.officerId); 
    
   if(filterParams.ApplicationSubmissionDateS)
        wh["ApplicationSubmissionDate"]= {[Op.gte]:filterParams.ApplicationSubmissionDateS};

    if(filterParams.ApplicationSubmissionDateE)
        wh["ApplicationSubmissionDate"]= {[Op.lte]:filterParams.ApplicationSubmissionDateE};

    const qry={};
    qry.where= wh;

    if(filterParams.sortBy)
        qry.order= [db.sequelize.literal(filterParams.sortBy)];

        //[sequelize.literal('user.name'), 'author']
    qry.include=[{model:db.statuses,  attributes: ['name'] , where:{'name':'הועבר למנהל'}},
                 {model:db.officers, attributes: ['managerId'], where:{'managerId':filterParams.managerId}},
                 {model:db.officers,  attributes: ['name'] }
                ];
    qry.raw=true;
    return File.findAll(qry);

};

exports.updateFile=(id,fileToUpdate)=>{
    console.log(id);
    console.log(fileToUpdate);
    return File.update(fileToUpdate, {
        where: { idfile: id }
      })

};

exports.deleteFileByID=(id)=>{

    return File.destroy({

      where: { idfile: id }

    })

}

      