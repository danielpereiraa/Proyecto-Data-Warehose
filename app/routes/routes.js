module.exports = app => {
  const regiones = require("../controllers/region.controller.js");
  const usuarios = require("../controllers/usuario_controller.js");
  const pais = require("../controllers/pais.controller.js");
  const ciudad = require("../controllers/ciudad.controller.js");
  const compañias = require("../controllers/compañia.controller.js");
  const contactos = require("../controllers/contacto.controller.js");


  app.post("/v1/login", usuarios.login)



//CRUD Regiones
  app.post("/v1/regiones", usuarios.verificarUsuario, regiones.create);
  app.post("/v1/regioness", usuarios.verificarUsuario, regiones.findAll);
  app.put("/v1/regiones/:regionId", usuarios.verificarUsuario, regiones.update);
  app.delete("/v1/regiones/:regionId", usuarios.verificarUsuario, regiones.delete);

//CRUD Paises
app.post("/v1/paises", usuarios.verificarUsuario, pais.create);
app.get("/v1/paises", pais.findAll);
app.get("/v1/paises/:regionId", pais.paisById)
app.put("/v1/paises/:paisId", usuarios.verificarUsuario, pais.update);
app.delete("/v1/paises/:paisId", usuarios.verificarUsuario, pais.delete);

//CRUD ciudades
app.post("/v1/ciudades", usuarios.verificarUsuario, ciudad.create);
app.get("/v1/ciudades/:paisId", ciudad.ciudadById)
app.put("/v1/ciudades/:ciudadId", usuarios.verificarUsuario, ciudad.update);
app.delete("/v1/ciudades/:ciudadId", usuarios.verificarUsuario, ciudad.delete);

//CRUD Usuarios 
app.post("/v1/usuarios", /*usuarios.verificarAdmin,*/ usuarios.create);
app.get("/v1/usuarios", /*usuarios.verificarAdmin,*/ usuarios.findAll);
app.put("/v1/usuarios/:usuarioId", /*usuarios.verificarAdmin,*/ usuarios.update);
app.delete("/v1/usuarios/:usuarioId", /*usuarios.verificarAdmin,*/ usuarios.delete);

//CRUD compañias 
app.post("/v1/companies", usuarios.verificarUsuario, compañias.create);
app.post("/v1/companiess", usuarios.verificarUsuario, compañias.findAll);
app.put("/v1/companies/:companyId", usuarios.verificarUsuario, compañias.update);
app.delete("/v1/companies/:companyId", usuarios.verificarUsuario, compañias.delete);

//CRUD contacto 
app.post("/v1/contactos", contactos.create);
app.get("/v1/contactos", contactos.findAll);
app.get("/v1/contactos/:input", contactos.findByInput);
app.put("/v1/contactos/:contactoId", usuarios.verificarUsuario, contactos.update);
app.delete("/v1/contactos/:contactoId", usuarios.verificarUsuario, contactos.delete);

}; 