const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Contacto = sequelize.define('Contacto', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: true
        },
        linkeding: {
            type: Sequelize.STRING,
            allowNull: true
        },
        usu_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Contacto;
}