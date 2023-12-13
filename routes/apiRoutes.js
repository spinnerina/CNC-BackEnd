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

const apiController = require('../controllers/apiController');

app.get('/saludo', authJWT, apiController.saludo);
app.post('/login', apiController.login);



module.exports = app;