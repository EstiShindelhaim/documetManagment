const { DataTypes } = require("sequelize");
const { sequelize, principals } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const Principal = sequelize.define('principals',
        {
            idprincipals: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: { type: DataTypes.STRING },
            mail: { type: DataTypes.STRING, allowNull: false}
        },
        {
            timestamps: false,
        });
    return Principal;
}
