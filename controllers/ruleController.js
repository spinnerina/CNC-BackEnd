const sequelize = require('../config/db');
const functiones = require('../config/function');

async function createRule(req, res){
    const { rule } = req.body;

    if(rule !== undefined && rule !== ""){
        try{
            const nuevaRule = await sequelize.Rule.create({
                rule: rule
            });

            res.status(201).json({ message: "Rule creada", rule: nuevaRule});
        }catch(error){
            console.log(error);
            res.status(500).json({ message: error});
        }
    }
}

module.exports = {
    createRule
};