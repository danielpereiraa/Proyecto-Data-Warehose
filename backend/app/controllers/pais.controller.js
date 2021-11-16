const Pais = require("../models/pais.model.js");


//Get

exports.findAll = (req, res) => {
  Pais.getAll((err, data) => {
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

exports.paisById = (req, res) => {
  Pais.findById(req.params.regionId ,(err, data) => {
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
//Post

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const pais = new Pais({
    region_id: req.body.region_id,
    nombre: req.body.nombre
  });

  Pais.create(pais, (err, data) => {
    if (err)  
      res.status(500).send({
        message:
          err.message || "Ocurrio un error creando el pais"
      });
    else res.send(pais);
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
  const pais = new Pais({
    region_id: req.body.region_id,
    nombre: req.body.nombre
  });

  Pais.updateById(
    req.params.paisId,
    pais,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found region with id ${req.params.paisId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating region with id " + req.params.paisId
          });
        }
      } else res.send(pais);
    }
  );
};

//Delete

exports.delete = (req, res) => {

  Pais.remove(req.params.paisId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.paisId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.paisId
        });
      }
    } else res.send({ message: `Region was deleted successfully!` });
  });
};
