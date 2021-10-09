const Ciudad = require("../models/ciudad.model.js");

exports.ciudadById = (req, res) => {
//    console.log("data")

    Ciudad.findById(req.params.paisId ,(err, data) => {
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

  exports.create = (req, res) => {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const ciudad = new Ciudad({
        id_pais: req.body.id_pais,
        nombre: req.body.nombre
    });
  
    Ciudad.create(ciudad, (err, data) => {
      if (err)  
        res.status(500).send({
          message:
            err.message || "Ocurrio un error creando el pais"
        });
      else res.send(ciudad);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const ciudad = new Ciudad({
        id_pais: req.body.id_pais,
        nombre: req.body.nombre
    });
    console.log("holssw")

    Ciudad.updateById(
      req.params.ciudadId,
      ciudad,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found region with id ${req.params.ciudadId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating region with id " + req.params.ciudadId
            });
          }
        } else res.send(ciudad);
      }
    );
  };
  
  //Delete
  
  exports.delete = (req, res) => {
  
    Ciudad.remove(req.params.ciudadId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.ciudadId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Customer with id " + req.params.ciudadId
          });
        }
      } else res.send({ message: `City was deleted successfully!` });
    });
  };
  