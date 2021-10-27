const db = require("./db.js");

const Contacto = function(contacto) {
    this.id = contacto.id
    this.nombre_contacto = contacto.nombre_contacto;
    this.apellido_contacto = contacto.apellido_contacto;
    this.email = contacto.email;
    this.pais = contacto.pais;
    this.nombre_company = contacto.nombre_company;
    this.direccion = contacto.direccion;
};

Contacto.getAll = (result) => {
    db.query("SELECT contactos.id, contactos.nombre_contacto, contactos.apellido_contacto, contactos.email, contactos.direccion, paises.nombre, compañias.nombre_company FROM contactos JOIN paises ON contactos.pais = paises.id JOIN compañias ON contactos.compañia = compañias.id" , { type: db.QueryTypes.SELECT })
    .then(res =>{  
        result(null, res);
        })
    .catch(err => console.error(err))
  };

Contacto.findByInput = (input_value, result) => {

    console.log(input_value);
    console.log(input_value);
        db.query('SELECT c.id, c.nombre_contacto, c.apellido_contacto, c.email, c.direccion, p.nombre, com.nombre_company FROM contactos c JOIN paises p ON c.pais = p.id JOIN compañias com  ON c.compañia = com.id WHERE c.nombre_contacto = :nombre_contacto OR c.apellido_contacto = :apellido_contacto OR c.email = :email OR p.nombre = :pais OR com.nombre_company = :nombre_company OR c.direccion = :direccion',
            {replacements : {nombre_contacto: input_value, apellido_contacto: input_value, email: input_value, pais: input_value, nombre_company: input_value, direccion: input_value}, type: db.QueryTypes.SELECT})
        .then(res => {
            result(null, res)
            })
        .catch(err => {console.log(err)})
}; 
  
Contacto.create = (nuevoContacto, result) => {
    console.log(nuevoContacto)

    db.query('INSERT INTO contactos VALUES (NULL, :nombre_contacto, :apellido_contacto, :email, :pais, :nombre_company, :direccion)', 
            {replacements : nuevoContacto})
        .then(res => {
            result(null, res)
        })
        .catch(err =>
        {console.error(err)})
}

Contacto.updateById = (contactoId, contactoNuevo, result) => {
    db.query('UPDATE contactos SET nombre_contacto = :nombre_contacto, apellido_contacto = :apellido_contacto, email = :email, pais = :pais, compañia = :nombre_company, direccion = :direccion  WHERE id = :id', 
    {replacements:{nombre_contacto: contactoNuevo.nombre_contacto, apellido_contacto: contactoNuevo.apellido_contacto, email: contactoNuevo.email, pais: contactoNuevo.pais, nombre_company: contactoNuevo.nombre_company, direccion: contactoNuevo.direccion, id: contactoId}})
    .then(res => {
        result(null, res)
    })
    .catch(err =>
        {console.error(err)})
}

Contacto.remove = (contactoId, result) => {
    db.query("DELETE FROM contactos WHERE id = :id",
            {replacements : {id: contactoId }}
    ).then(res => {
        result(null, res)
        console.log(res)}
    ).catch(err =>
        console.error(err))
}

module.exports = Contacto;

