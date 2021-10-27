const Contacto = require("../models/contacto.model.js");


//Get

exports.findAll = (req, res) => {
  Contacto.getAll((err, data) => {
    console.log(err);
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

exports.findByInput = (req, res) => {
  console.log(req.params.input);

  Contacto.findByInput(req.params.input, (err, data) => {
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

//Post

exports.create = (req, res) => {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const contacto = new Contacto({
      nombre_contacto: req.body.nombre_contacto,
      apellido_contacto: req.body.apellido_contacto,
      email: req.body.email,
      pais: req.body.pais,
      nombre_company: req.body.nombre_company,
      direccion: req.body.direccion
    });
  
    console.log(contacto)
    Contacto.create(contacto, (err, data) => {
      if (err)  
        res.status(500).send({
          message:
            err.message || "Ocuarrio un error al crear el contacto."
        });
      else res.send(contacto);
    });
  };

//PUT

exports.update = (req, res) => {

  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const contacto = new Contacto({
    nombre_contacto: req.body.nombre_contacto,
    apellido_contacto: req.body.apellido_contacto,
    email: req.body.email,
    pais: req.body.pais,
    nombre_company: req.body.nombre_company,
    direccion: req.body.direccion
  });

  console.log(contacto);
  Contacto.updateById(
    req.params.contactoId,
    contacto,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.contactoId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.contactoId
          });
        }
      } else res.send(contacto);
    }
  );
};

//DELETE
exports.delete = (req, res) => {

  Contacto.remove(req.params.contactoId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found contact with id ${req.params.contactoId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete contact with id " + req.params.contactoId
        });
      }
    } else res.send({ message: `Contact was deleted successfully!` });
  });
};
  

