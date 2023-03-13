const { DataTypes } = require("sequelize");
const { sequelize, algorithmsalgo } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Algorithm = sequelize.define('algorithms',
        {
            idalgorithm: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.STRING}
        },
        {
            timestamps: false,
        });
    return Algorithm;
}