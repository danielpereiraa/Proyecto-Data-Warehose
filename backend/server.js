  
const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


const rutas = require("./app/routes/routes.js");
rutas(app);


app.listen(3000, () => {console.log("servidor en ejecucion")});