const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Rule = sequelize.define('Rule', {
        rule: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Rule;
};