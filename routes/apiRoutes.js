const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

const secret = process.env.SECRET_KEY;

const authJWT = (req, res, next) =>{
    const authHeaders =  req.headers.authorization;

    if(authHeaders){
        const token = authHeaders.split(' ')[1];
        jwt.verify(token, secret, (err, user) => { 
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    }else{
        res.sendStatus(401);
    }
}

const usuarioController = require('../controllers/usuariosController');
const ruleController = require('../controllers/ruleController');
const contactoController = require('../controllers/contactoController');

//Usuario
app.post('/login', usuarioController.login);
app.post('/register', usuarioController.register);
app.put('/usuario/update/:id', authJWT, usuarioController.updateUsuario);
app.delete('/usuario/delete/:id', authJWT, usuarioController.deleteUsuario);

//Rule
app.post('/rule/nueva', authJWT, ruleController.createRule);
app.put('/rule/update/:id', authJWT, ruleController.updateRule);
app.delete('/rule/delete/:id', authJWT, ruleController.deleteRule);

//Contacto
app.post('/contacto/nuevo', authJWT, contactoController.createContacto);



module.exports = app;