const statusDal=require('../dal/status');


exports.getStatuses=(req, res)=>{
    statusDal.getStatuses()
    .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving Documents."
        });
        });
}