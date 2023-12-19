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

app.post('/login', usuarioController.login);
app.post('/register', usuarioController.register);
app.post('/rule/nueva', ruleController.createRule);



module.exports = app;