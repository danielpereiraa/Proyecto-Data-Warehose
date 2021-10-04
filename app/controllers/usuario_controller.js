const Usuario = require("../models/usuario.model.js");
const jwt = require('jsonwebtoken');


const jwtClave = "d4Ta_W4reH0u$3";



//Post

exports.create = (req, res) => {
  console.log("usuario")

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const usuario = new Usuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      admin: req.body.admin,
      password: req.body.password
    });
  
    console.log(usuario)
    Usuario.create(usuario, (err, data) => {
      if (err)  
        res.status(500).send({
          message:
            err.message || "Ocuarrio un error al crear el usuario."
        });
      else res.send(usuario);
    });
  };

exports.findAll = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else {
      console.log(data)
      res.send(data);}

  });
};

//Update

exports.update = (req, res) => {

  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const usuario = new Usuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    admin: req.body.admin,
    password: req.body.password
  });

  Usuario.updateById(
    req.params.usuarioId,
    usuario,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.usuarioId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.usuarioId
          });
        }
      } else res.send(usuario);
    }
  );
};

//Delete

exports.delete = (req, res) => {
  console.log("hola");

  Usuario.remove(req.params.usuarioId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.usuarioId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.usuarioId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
  



//login creacion token

exports.login = (req, res) =>{

  Usuario.findByEmail(req.body.email, (err, data) => {


    if(data.length == 1){
      if(req.body.email == data[0].email && req.body.password == data[0].password){
        let token = jwt.sign({usuario: data[0].email, admin: data[0].admin, id: data[0].id}, jwtClave)
        res.status(200).send({token: token, admin: data[0].admin
        })  
      }else{
        res.status(401).send({error: "usuario o clave incorrectos"})
      }
    }else{
      res.status(401).send({error: "usuario o clave incorrectos"})
    }
    
  })
};


//midleware verificacion Token

exports.verificarToken = (req, res, next) =>{


  var token_local = localStorage.getItem("token");
  console.log(token_local)

  if(token){
    let decodificado = jwt.verify(token, jwtClave);
    console.log(decodificado);
    if(!decodificado || decodificado.admin == 0){
      console.log("decodificado");
      nav_menu.classList.toggle("d-none");

      retornarUsuarioNoAutorizado(res);
    }else{
      next();
      return decodificado
    }
  }else{
    retornarUsuarioNoAutorizado(res);
  }
}

retornarUsuarioNoAutorizado = (respuesta) =>{
  respuesta.status(401).send({error: "usuario no autorizado"})
}
/*

//GET BY ID

exports.userById = (req, res) => {
  Usuario.findById(req.params.usuarioId ,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrio u error buscando los usuarios."
      });
    else {
      console.log(data)
      res.send(data);}

  });
};

// MIDLEWARE GET OWN INFO

exports.verificarId = (req, res, next) =>{
  
  let userId = req.params.usuarioId;
  let token = req.headers.authorization;
  console.log(token);
  if(token){
    token = token.split(" ")[1];
    let decodificado = jwt.verify(token, jwtClave);
console.log(decodificado.id);
    if(!decodificado || decodificado.admin == 0){
      if(decodificado.id != userId){
        retornarUsuarioNoAutorizado(res);
      }else{
        next();
      }
    }else{
      next();
    }
  }else{
    retornarUsuarioNoAutorizado(res);
  }
}*/