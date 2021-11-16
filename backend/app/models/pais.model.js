const db = require("./db.js");

const Pais = function(pais) {
    this.id = pais.id
    this.region_id = pais.region_id;
    this.nombre = pais.nombre;
};

Pais.getAll = (result) => {
    db.query("SELECT * FROM paises" , { type: db.QueryTypes.SELECT })
    .then(res =>{      
        result(null, res);
        })
    .catch(err => console.error(err))
  };

Pais.findById = (region_id, result) => {
    db.query('SELECT * FROM paises WHERE region_id = :regionId',
            {replacements : {regionId: region_id}, type: db.QueryTypes.SELECT})
        .then(res => {
            result(null, res)
            })
        .catch(err => {console.log(err)})
};


Pais.create = (paisNuevo, result) => {
    db.query('INSERT INTO paises VALUES (NULL, :region_id, :nombre)', 
        {replacements : paisNuevo})
        .then(res => {
        result(null, res)
        console.log("Pais agregado")})
        .catch(err =>
        {console.error(err)})
}

Pais.updateById = (paisId, paisNuevo, result) => {
    db.query('UPDATE paises SET region_id = :region_id, nombre = :nombre WHERE id = :id', 
    {replacements:{region_id: paisNuevo.region_id, nombre: paisNuevo.nombre, id: paisId}})
    .then(res => {
        result(null, res)
        console.log("Pais actualizado")
    })
    .catch(err =>
        {console.error(err)})
}



Pais.remove = (paisId, result) => {
    db.query("DELETE FROM paises WHERE id = :id",
            {replacements : {id: paisId}}
    ).then(res => {
        result(null, res)
        console.log(res)}
    ).catch(err =>
        console.error(err))
}


  module.exports = Pais;