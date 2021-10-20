const { DataTypes } = require("sequelize");

const db = require("../utilities/dbHelper");

const Faculty = db.define(
  "faculty",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    abbreviation: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {}
);
Faculty.toJSON = () => {
  return { ...this.get(), id: undefined };
};

module.exports = Faculty;
