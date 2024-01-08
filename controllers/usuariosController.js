const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const functiones = require('../config/function');
const secret = process.env.SECRET_KEY;
const bcrypt = require('bcrypt');


async function login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await sequelize.Usuario.findOne({ where: { username } });

        // Verificar si el usuario existe
        if (!user) {
            res.status(400).json({ message: 'Usuario no encontrado'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
      
        if(!isPasswordValid){
            res.status(400).json({ message: 'Contraseña incorrecta'});
        }else{
            const token = jwt.sign({ username: username }, secret);
            res.status(200).json({ message: 'Login correcto', user: user, token: token});
        }
    } catch (error) {
      console.log(error);
    }
}

async function register(req, res){
    const { username, password, email, habilitado, rule_id } = req.body; 

    try{
    if (username !== undefined && password !== undefined && username !== "" && password !== "" && habilitado !== undefined && habilitado !== "") {
        //Encrypto la contraseña
        const passwordEncrypt = await functiones.encrypt(password);

        try {
            const nuevoUsuario = await sequelize.Usuario.create({
                username: username,
                password: passwordEncrypt,
                email: email,
                habilitado: habilitado,
                rule_id: rule_id
            });
        
            res.status(201).json({ message: "Registrado correctamente", result: nuevoUsuario });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al registrar el nuevo usuario", error: error.message });
        }
    }else{
        res.status(400).json({ message: "Faltan datos por enviar o son inválidos" });
    }
    }catch(err){
        res.status(500).json({ message: "Error de servidor", error: err});
    }
}

async function updateUsuario(req, res){
    const { username, email, habilitado, rule_id} = req.body;
    const id = req.params.id;

    try{
        const usuarioActualizado = await sequelize.Usuario.update({
            username: username,
            email: email,
            habilitado: habilitado,
            rule_id: rule_id
        }, {
            where: {
                id: id
            },
        });

        res.status(201).json({ message: "Usuario actualizado corectamente", usuario: usuarioActualizado });
    }catch(error){
        res.status(500).json({ message: "Error al actualizar el usuario", error: error})
    }
}

async function deleteUsuario(req, res){
    const id = req.params.id;

    try{
        const usuarioEliminado = await sequelize.Usuario.destroy({
            where:{
                id: id
            },
        });
        
        res.status(200).json({ message: "Usuario eliminado correctamente", usuario: usuarioEliminado});
    }catch(error){
        res.status(500).json({ message: "Error al eliminar el usuario", error: error});
    }
}

module.exports = {
    login,
    register,
    updateUsuario,
    deleteUsuario
};