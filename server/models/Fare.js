const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database/connection')

const Fare = sequelize.define('Fare', {
  // Model attributes are defined here
  Country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  City: {
    type: DataTypes.STRING
  },
  vehicle_types: {
    type: DataTypes.STRING
  },
  City: {
    type: DataTypes.STRING
  },
  Amount_Airport_fees: {
    type: DataTypes.INTEGER
  },
  Amount_Per_hour: {
    type: DataTypes.INTEGER
  },
  Amount_Per_KM: {
    type: DataTypes.INTEGER
  },
  Base_Amount: {
    type: DataTypes.INTEGER
  },
  Base_KM: {
    type: DataTypes.INTEGER
  },


}, {
  // Other model options go here
  timestamps:false,
  freezeTableName: true
});

module.exports = Fare