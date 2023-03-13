const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const Student = sequelize.define('students',{
        idstudents: {
                    primaryKey: true,
                    type: DataTypes.INTEGER
                    },
        name:DataTypes.STRING,
        grade:DataTypes.STRING,
        mail:DataTypes.STRING,
        phone: DataTypes.INTEGER,
        id: DataTypes.INTEGER,
        password: DataTypes.INTEGER,
        ismanager: DataTypes.INTEGER
    },
    // {
    //     freezeTableName:true
    // }  
    {
        timestamps: false
    },
  
    );
    return Student;
}