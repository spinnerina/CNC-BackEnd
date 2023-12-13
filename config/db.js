const Sequelize = require('sequelize');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

// Obtener las variables de entorno
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
});

// Verificar la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

//Modelos
const UsuarioModel = require('../models/UsuarioModel');
const Usuario = UsuarioModel(sequelize);



// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado con la base de datos.');
  })
  .catch(err => {
    console.error('Error al sincronizar el modelo con la base de datos:', err);
  });

// Exportar el objeto sequelize para ser utilizado en otros archivos
module.exports = {
  sequelize,
  Usuario
};
