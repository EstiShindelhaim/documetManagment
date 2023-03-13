const mysql= require ("mysql");

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.files = require('./models/file')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
.then(() => {
console.log('yes re-sync done!')
})
module.exports = db
