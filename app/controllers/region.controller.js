const Region = require("../models/region.model.js");


//Get

exports.findAll = (req, res) => {
  Region.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companys."
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

  const region = new Region({
    nombre: req.body.nombre,
  });

  Region.create(region, (err, data) => {
    if (err)  
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(region);
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
  const region = new Region({
    nombre: req.body.nombre,
  });

  Region.updateById(
    req.params.regionId,
    region,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found region with id ${req.params.regionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating region with id " + req.params.regionId
          });
        }
      } else res.send(region);
    }
  );
};


//Delete

exports.delete = (req, res) => {

  Region.remove(req.params.regionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.regionId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.regionId
        });
      }
    } else res.send({ message: `Region was deleted successfully!` });
  });
};
