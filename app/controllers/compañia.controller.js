const Compañias = require("../models/compañia.model.js");


//Get

exports.findAll = (req, res) => {
  Compañias.getAll((err, data) => {
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

//Post

exports.create = (req, res) => {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    const compañia = new Compañias({
      nombre: req.body.nombre_company,
      direccion: req.body.direccion,
      email: req.body.email,
      telefono: req.body.telefono,
      ciudad_id: req.body.ciudad_id
    });

    console.log(compañia)
  
    Compañias.create(compañia, (err, data) => {
      if (err)  
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the company."
        });
      else res.send(compañia);
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
  const compañia = new Compañias({
    nombre: req.body.nombre_company,
    direccion: req.body.direccion,
    email: req.body.email,
    telefono: req.body.telefono,
    ciudad_id: req.body.ciudad_id
  });

  Compañias.updateById(
    req.params.companyId,
    compañia,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found company with id ${req.params.compañiaId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating company with id " + req.params.compañiaId
          });
        }
      } else res.send(compañia);
    }
  );
};

//Delete

exports.delete = (req, res) => {

  Compañias.remove(req.params.companyId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.companyId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.companyId
        });
      }
    } else res.send({ message: `Company was deleted successfully!` });
  });
};

