const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const Question = sequelize.define('questions',{
        idquestions: {
                    primaryKey: true,
                    type: DataTypes.INTEGER
                    },
        description:DataTypes.STRING,
        idclasssubject: DataTypes.INTEGER,
        idquestiontype: DataTypes.INTEGER,
        score: DataTypes.INTEGER
    },
    // {
    //     
    // }  
    {
        timestamps: false,
        freezeTableName:true
    },
  
    );
    return Question;
}