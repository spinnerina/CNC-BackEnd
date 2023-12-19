// UsuarioModel.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    habilitado: {
      type: Sequelize.BOOLEAN,
      default: false,
      allowNull: false
    },
    rule_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Usuario;
};
