const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Reunion = sequelize.define('Reunion', {
        fecha_reunion: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        hora_reunion: {
            type: Sequelize.TIME,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        timestamps: false
    });

    return Reunion;
}