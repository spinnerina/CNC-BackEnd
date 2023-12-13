const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const functiones = require('../config/function');
const secret = process.env.SECRET_KEY;

function saludo(req, res){
    res.json({ message: 'Hola! Bienvenido a mi api de express y WebSocket'});
}

function login(req, res){
    const { username, password } = req.body;
    let passwordEncrypt;
   functiones.encrypt(password).then((hashPassword) => {
    passwordEncrypt = hashPassword
   }).catch((error) => {
        console.log(error);
   });

   console.log(passwordEncrypt);
    //logica del login
    sequelize.Usuario.findAll()
    .then((usuarios) => {
        const token = jwt.sign({ username: username }, secret);
        res.json({ token: token, result: usuarios });
    })
    .catch(err => {
        res.send('Error en la consulta:' + err);
    });
}

module.exports = {
    saludo,
    login
};