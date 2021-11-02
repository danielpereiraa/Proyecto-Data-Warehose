module.exports = app => {
  const regiones = require("../controllers/region.controller.js");
  const usuarios = require("../controllers/usuario_controller.js");
  const pais = require("../controllers/pais.controller.js");
  const ciudad = require("../controllers/ciudad.controller.js");
  const compañias = require("../controllers/compañia.controller.js");
  const contactos = require("../controllers/contacto.controller.js");


  app.post("/v1/login", usuarios.login)


//midleawares
 // var admin = usuarios.verificarAdmin;

  var verificar = usuarios.verificarUsuario
  //app.use(verificar);

//CRUD Regiones
  app.post("/v1/regiones", regiones.create);
  app.get("/v1/regiones",  regiones.findAll);
  app.put("/v1/regiones/:regionId", regiones.update);
  app.delete("/v1/regiones/:regionId", regiones.delete);

//CRUD Paises
app.post("/v1/paises", pais.create);
app.get("/v1/paises", pais.findAll);
app.get("/v1/paises/:regionId", pais.paisById)
app.put("/v1/paises/:paisId", pais.update);
app.delete("/v1/paises/:paisId", pais.delete);

//CRUD ciudades

app.post("/v1/ciudades", ciudad.create);
app.get("/v1/ciudades/:paisId", ciudad.ciudadById)
app.put("/v1/ciudades/:ciudadId",ciudad.update);
app.delete("/v1/ciudades/:ciudadId", ciudad.delete);



//CRUD Usuarios 
app.post("/v1/usuarios", /*usuarios.verificarAdmin,*/ usuarios.create);
app.get("/v1/usuarios", /*usuarios.verificarAdmin,*/ usuarios.findAll);
app.put("/v1/usuarios/:usuarioId", /*usuarios.verificarAdmin,*/ usuarios.update);
app.delete("/v1/usuarios/:usuarioId", /*usuarios.verificarAdmin,*/ usuarios.delete);


 /* app.get("/v1/usuarios/:usuarioId", usuarios.verificarId, usuarios.userById)*/

 

//CRUD compañias 
app.post("/v1/companies", compañias.create);
app.get("/v1/companies", compañias.findAll);
app.put("/v1/companies/:companyId", compañias.update);
app.delete("/v1/companies/:companyId", compañias.delete);

//CRUD contacto 
app.post("/v1/contactos", contactos.create);
app.get("/v1/contactos", contactos.findAll);
app.get("/v1/contactos/:input", contactos.findByInput);
app.put("/v1/contactos/:contactoId", contactos.update);
app.delete("/v1/contactos/:contactoId", contactos.delete);







}; 