const db_data = require('../config/db.config.js');
const Sequelize = require('sequelize');
const myDataBase   = new Sequelize( db_data.conf_db_name, db_data.conf_user, db_data.conf_password, { 
    host: db_data.conf_db_host,
    dialect: 'mysql',
    port: db_data.conf_port,
    dialectOptions: {
        multipleStatements: true
    }
});

console.log("Conectado...");
myDataBase.authenticate().then(()=>{
    console.log("Conectado...");
}).catch(err=> {
    console.error("Error de conexion", err);
});

module.exports = myDataBase;

