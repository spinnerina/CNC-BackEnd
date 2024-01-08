const sequelize = require('../config/db');


async function createContacto(req, res){
    const { nombre, email, telefono, linkeding, usu_id } = req.body;

    if(nombre !== "" && email !== "" && usu_id !== "" && nombre !== undefined && email !== undefined && usu_id !== undefined){
        try{
            const nuevoContacto = await sequelize.Contacto.create({
                nombre: nombre,
                email: email,
                telefono: telefono,
                linkeding: linkeding,
                usu_id: usu_id
            });
    
            res.status(201).json({ message: "Contacto creado", contacto: nuevoContacto });
        }catch(err){
            res.status(500).json({ message: err});
        }
    }else{
        res.status(400).json({ message: "Faltan datos de enviar" });
    }
    
}

async function updateContacto(req, res){
    const { nombre, email, telefono, linkeding, usu_id} = req.body;
    const id = req.params.id;

    try{
        const contactoActualizado = await sequelize.Contacto.update({
            nombre: nombre,
            email: email,
            telefono: telefono,
            linkeding: linkeding,
            usu_id: usu_id,
        },
        {
            where: { 
                id: id 
            },
        });
        res.status(200).json({ message: "Contacto actualizado correctamente", contacto: contactoActualizado });
    }catch(error){
        res.status(500).json({ message: "Error al modificar el contacto", error: error});
    }
}

async function deleteContacto(req, res){
    const id = req.params.id;

    try{
        const contactoDelete = sequelize.Contacto.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({ message: "Contacto eliminado correctamente ", contacto: contactoDelete });
    }catch(error){
        res.status(500).json({ message: "Error al eliminar el contacto", error: error });
    }
}

module.exports = {
    createContacto,
    updateContacto,
    deleteContacto
};