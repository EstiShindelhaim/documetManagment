const principalDal=require('../dal/principal');
const principal = require('../models/principal');

exports.getPrincipal=(req, res)=>{
    principalDal.getPrincipal()
    .then(data => {
        res.send(data[0]);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving principals."
        });
        });
}
