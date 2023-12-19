const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cliente = sequelize.define('Cliente', {
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
        }
    });

    return Cliente;
}