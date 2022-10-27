const { Sequelize ,DataTypes } = require('sequelize');

const sequelize = new Sequelize('rydeu', 'root', 'Chris111', {
    host: '127.0.0.1',
    dialect: 'mysql'
  });
  
module.exports = sequelize