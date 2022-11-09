const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

const Posts = sequelize.define('Posts', {
  // Model 속성 정의
  // id: {
  //   type: DataTypes.INTEGER,
  //   autoIncrement: true,
  //   allowNull: false,
  //   primaryKey: true,
  // },

  post: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = { sequelize, Posts };
