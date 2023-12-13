const express = require('express');
const http = require('http');
const app = express();
require('dotenv').config();


//Conf express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


//Conf rutas api
const apiRoutes = require('./routes/apiRoutes');
app.use('/', apiRoutes);

//Creo servidor http
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> {
    console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});