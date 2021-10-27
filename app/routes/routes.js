module.exports = app => {
  const regiones = require("../controllers/region.controller.js");
  const usuarios = require("../controllers/usuario_controller.js");
  const pais = require("../controllers/pais.controller.js");
  const ciudad = require("../controllers/ciudad.controller.js");
  const compañias = require("../controllers/compañia.controller.js");
  const contactos = require("../controllers/contacto.controller.js");

  

//CRUD Regiones
  app.post("/v1/regiones"/*, usuarios.verificarToken*/, regiones.create);
  app.get("/v1/regiones",  regiones.findAll);
  app.put("/v1/regiones/:regionId",/* usuarios.verificarToken, */regiones.update);
  app.delete("/v1/regiones/:regionId", /*usuarios.verificarToken, */regiones.delete);

//CRUD Paises
app.post("/v1/paises"/*, usuarios.verificarToken*/, pais.create);
app.get("/v1/paises",  pais.findAll);
app.get("/v1/paises/:regionId", pais.paisById)
app.put("/v1/paises/:paisId",/* usuarios.verificarToken, */pais.update);
app.delete("/v1/paises/:paisId", /*usuarios.verificarToken, */pais.delete);

//CRUD ciudades

app.post("/v1/ciudades"/*, usuarios.verificarToken*/, ciudad.create);
app.get("/v1/ciudades/:paisId", ciudad.ciudadById)
app.put("/v1/ciudades/:ciudadId",/* usuarios.verificarToken, */ciudad.update);
app.delete("/v1/ciudades/:ciudadId", /*usuarios.verificarToken, */ciudad.delete);



//CRUD Usuarios 
app.post("/v1/usuarios", usuarios.create);
app.get("/v1/usuarios", usuarios.findAll);
app.put("/v1/usuarios/:usuarioId",/* usuarios.verificarToken, */usuarios.update);
app.delete("/v1/usuarios/:usuarioId", /*usuarios.verificarToken,*/ usuarios.delete);


app.post("/v1/login", usuarios.login)
 /* app.get("/v1/usuarios/:usuarioId", usuarios.verificarId, usuarios.userById)*/

 

//CRUD compañias 
app.post("/v1/companies", compañias.create);
app.get("/v1/companies", compañias.findAll);
app.put("/v1/companies/:companyId", compañias.update);
app.delete("/v1/companies/:companyId", /*usuarios.v  erificarToken,*/ compañias.delete);

//CRUD contacto 
app.post("/v1/contactos", contactos.create);
app.get("/v1/contactos", contactos.findAll);
app.get("/v1/contactos/:input", contactos.findByInput);
app.put("/v1/contactos/:contactoId", contactos.update);
app.delete("/v1/contactos/:contactoId", /*usuarios.v  erificarToken,*/ contactos.delete);





//midleaware global
  app.use((err, req, res, next) => {
    if(err){
      res.status(500).send(err);
    }else{
      next();
    }
  })

};  