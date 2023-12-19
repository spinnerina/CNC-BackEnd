const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const UsuarioReunion = sequelize.define('UsuarioxReunion', {
        usu_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        reunion_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        contacto_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cliente_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        asunto: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return UsuarioReunion;
}