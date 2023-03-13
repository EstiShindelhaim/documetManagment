const { principals } = require("../models/index");
const db = require("../models/index");

const Principal= db.principals;


exports.getPrincipal=()=>{
   
    return Principal.findAll({});

};