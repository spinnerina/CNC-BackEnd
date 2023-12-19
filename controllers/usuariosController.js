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
        
            res.json({ message: "Registrado correctamente", result: nuevoUsuario });
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

module.exports = {
    login,
    register
};