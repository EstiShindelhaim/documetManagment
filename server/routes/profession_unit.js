const express = require("express");

const professionCntrl = require("../controllers/profession_unit");

const professionRouter = express.Router();

professionRouter.route("/:managerId")
    .post(professionCntrl.addProfessionUnit);
professionRouter.route("/byManager/:managerId")
  .get(professionCntrl.getProfessionUnitByManager)
professionRouter.route("/:id")
  .put(professionCntrl.updateProfessionUnit)
  .delete(professionCntrl.deleteProfessionUnitById)
module.exports = professionRouter;
