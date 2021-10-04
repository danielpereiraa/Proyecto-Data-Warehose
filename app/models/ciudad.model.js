const db = require("./db.js");

const Ciudad = function(ciudad) {
    this.id = ciudad.id
    this.id_pais = ciudad.id_pais;
    this.nombre = ciudad.nombre;
};

Ciudad.findById = (id_pais, result) => {
    console.log("data")

    db.query('SELECT * FROM ciudades WHERE id_pais = :paisId',
            {replacements : {paisId: id_pais}, type: db.QueryTypes.SELECT})
        .then(res => {
            result(null, res)
            })
        .catch(err => {console.log(err)})
};

Ciudad.create = (ciudadNueva, result) => {
    db.query('INSERT INTO ciudades VALUES (NULL, :id_pais, :nombre)', 
        {replacements : ciudadNueva})
        .then(res => {
        result(null, res)
        console.log("Ciudad agregada")})
        .catch(err =>
        {console.error(err)})
}

Ciudad.updateById = (ciudadId, ciudadNueva, result) => {
    db.query('UPDATE ciudades SET id_pais = :id_pais, nombre = :nombre WHERE id = :id', 
    {replacements:{id_pais: ciudadNueva.id_pais, nombre: ciudadNueva.nombre, id: ciudadId}})
    .then(res => {
        result(null, res)
        console.log("Ciudad actualizada")
    })
    .catch(err =>
        {console.error(err)})
}

Ciudad.remove = (ciudadId, result) => {
    db.query("DELETE FROM ciudades WHERE id = :id",
            {replacements : {id: ciudadId}}
    ).then(res => {
        result(null, res)
        console.log(res)}
    ).catch(err =>
        console.error(err))
}



module.exports = Ciudad;
