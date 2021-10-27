const db = require("./db.js");

const Compañias = function(compañias) {
    this.id = compañias.id
    this.nombre = compañias.nombre_company;
    this.direccion = compañias.direccion;
    this.email = compañias.email;
    this.telefono = compañias.telefono;
    this.ciudad_id = compañias.ciudad_id;

};

Compañias.getAll = (result) => {
    db.query("SELECT compañias.id, compañias.nombre_company, compañias.direccion, compañias.email, compañias.telefono, ciudades.nombre_ciudad FROM compañias JOIN ciudades WHERE compañias.ciudad_id = ciudades.id" , { type: db.QueryTypes.SELECT })
    .then(res =>{  
        console.log    
        result(null, res);
        })
    .catch(err => console.error(err))   
}

Compañias.create = (compañiaNueva, result) => {
db.query('INSERT INTO compañias VALUES (NULL, :nombre_company, :direccion, :email, :telefono, :ciudad_id)', 
    {replacements : compañiaNueva})
    .then(res => {
    result(null, res)
    console.log("Compañia agregada")})
    .catch(err =>
    {console.error(err)})
}

Compañias.updateById = (companyId, compañiaNueva, result) => {
    db.query('UPDATE compañias SET nombre_company = :nombre, direccion = :direccion, email = :email, telefono = :telefono, ciudad_id = :ciudad_id  WHERE id = :id', 
    {replacements:{nombre: compañiaNueva.nombre, direccion: compañiaNueva.direccion, email: compañiaNueva.email, telefono: compañiaNueva.telefono, ciudad_id: compañiaNueva.ciudad_id,  id: companyId}})
    .then(res => {
        result(null, res)
        console.log("Compañia actualizada")
    })
    .catch(err =>
        {console.error(err)})
}

Compañias.remove = (companyId, result) => {
    db.query("DELETE FROM compañias WHERE id = :id",
            {replacements : {id: companyId}}
    ).then(res => {
        result(null, res)
        console.log(res)}
    ).catch(err =>
        console.error(err))
}
/*
Ciudad.findById = (id_pais, result) => {
    console.log("data")

    db.query('SELECT * FROM ciudades WHERE id_pais = :paisId',
            {replacements : {paisId: id_pais}, type: db.QueryTypes.SELECT})
        .then(res => {
            result(null, res)
            })
        .catch(err => {console.log(err)})
};


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



*/

module.exports = Compañias;
