const { DataTypes } = require("sequelize");
const { sequelize, files } = require(".");

module.exports = (sequelize, DataTypes) => {//primary key
    const File = sequelize.define('files',
        {
            idfile: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            statusId: { type: DataTypes.INTEGER },
            urgency: { type: DataTypes.TINYINT, defaultValue: 0 },//default
            ApplicationSubmissionDate: { type: DataTypes.DATE},//
            IDnumberOfApplicant: { type: DataTypes.STRING },
            name: { type: DataTypes.STRING},
            result: { type: DataTypes.TINYINT },
            officerId: { type: DataTypes.INTEGER },
            thoroughCheck: { type: DataTypes.TINYINT, defaultValue: 0 },
            remarks: { type: DataTypes.STRING }
        },
        {
            timestamps: false,
        });
    return File;
}