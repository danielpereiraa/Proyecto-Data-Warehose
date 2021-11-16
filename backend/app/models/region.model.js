const db = require("./db.js");

const Region = function(region) {
    this.id = region.id
    this.nombre = region.nombre;
};

Region.getAll = (result) => {
    db.query("SELECT * FROM regiones" , { type: db.QueryTypes.SELECT })
    .then(res =>{      
        result(null, res);
        })
    .catch(err => console.error(err))
  };


Region.create = (regionNueva, result) => {
    db.query('INSERT INTO regiones VALUES (NULL, :nombre)', 
        {replacements : regionNueva})
        .then(res => {
        result(null, res)
        console.log("Region creada")})
        .catch(err =>
        {console.error(err)})
}

Region.updateById = (regionId, regionNueva, result) => {
    db.query('UPDATE regiones SET nombre = :nombre WHERE id = :id', 
    {replacements:{nombre: regionNueva.nombre, id: regionId}})
    .then(res => {
        result(null, res)
        console.log("Region actualizada")
    })
    .catch(err =>
        {console.error(err)})
}



Region.remove = (regionId, result) => {
    db.query("DELETE FROM regiones WHERE id = :id",
            {replacements : {id: regionId }}
    ).then(res => {
        result(null, res)
        console.log(res)}
    ).catch(err =>
        console.error(err))
}


  module.exports = Region;