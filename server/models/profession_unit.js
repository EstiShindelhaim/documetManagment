const { DataTypes } = require("sequelize");
const { sequelize, profession_units } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Profession_unit = sequelize.define('profession_units',
        {
            idprofession_unit: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING, allowNull: false },
            daysForViewingClosedFile: { type: DataTypes.INTEGER },
            costOfFillingApplication: { type: DataTypes.INTEGER },
            companyId: { type: DataTypes.INTEGER }
        },
        {
            timestamps: false,
            freezeTableName:true
        });
    return Profession_unit;
}