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
            res.status(500).json({ message: error});
        }
    }
}

async function updateRule(req, res){
    const { rule } = req.body;
    const id = req.params.id;

    try{
        const ruleActualizada = await sequelize.Rule.update({
            rule: rule
        }, {
            where:{
                id: id,
            }
        });

        res.status(201).json({ message: "Rule actualizada correctamente", rule: ruleActualizada });
    }catch(error){
        res.status(500).json({ message: "Error al actualizar el rol", error: error});
    }
}

async function deleteRule(req,res){
    const id = req.params.id;

    try{
        const ruleEliminada = await sequelize.Rule.destroy({
            where:{
                id: id
            },
        });

        res.status(201).json({ message: "Rule eliminada correctamente", rule: ruleEliminada });
    }catch(error){
        res.status(500).json({ message: "Error al eliminar el rol", error: error });
    }
}

module.exports = {
    createRule,
    updateRule,
    deleteRule
};