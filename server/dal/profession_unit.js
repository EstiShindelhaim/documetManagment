const db = require("../models/index");
const Profession = db.profession_units;

exports.addProfessionUnit = (professionToAdd) => {
    return Profession.create(professionToAdd);
  };

exports.getProfessionUnitByCompany = (id) => {

return Profession.findAll({ where: { companyId: id } });
};

exports.updateProfessionUnit = (id, stageToUpdate) => {
return Profession.update(stageToUpdate, {
    where: { idprofession_unit: id },
});
};