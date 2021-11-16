const db = require("./db.js");

const Usuario = function(usuario) {
    this.id = usuario.id
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.email = usuario.email;
    this.admin = usuario.admin;
    this.password = usuario.password
};


Usuario.create = (nuevoUsuario, result) => {

    db.query('INSERT INTO usuarios VALUES (NULL, :nombre, :apellido, :email,:password, :admin)', 
            {replacements : nuevoUsuario})
        .then(res => {
            result(null, res)
            console.log("Usuario creado: ", { 
                nombre: nuevoUsuario.nombre,
                apellido: nuevoUsuario.apellido,
                email: nuevoUsuario.email,
                admin: nuevoUsuario.admin,
                password: nuevoUsuario.password
            })
        })
        .catch(err =>
        {console.error(err)})
}

Usuario.getAll = (result) => {
    db.query("SELECT * FROM usuarios" , { type: db.QueryTypes.SELECT })
    .then(res =>{  
        result(null, res);
        })
    .catch(err => console.error(err))
  };

Usuario.updateById = (usuarioId, usuarioNuevo, result) => {
db.query('UPDATE usuarios SET nombre = :nombre, apellido = :apellido, email = :email, password = :password, admin = :admin  WHERE id = :id', 
{replacements:{nombre: usuarioNuevo.nombre, apellido: usuarioNuevo.apellido, email: usuarioNuevo.email, password: usuarioNuevo.password, admin: usuarioNuevo.admin, id: usuarioId}})
.then(res => {
    result(null, res)
    console.log("Usuario actualizado: ", { 
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email,
        admin: nuevoUsuario.admin,
        password: nuevoUsuario.password
    })
})
.catch(err =>
    {console.error(err)})
}

Usuario.remove = (usuarioId, result) => {
    db.query("DELETE FROM usuarios WHERE id = :id",
            {replacements : {id: usuarioId }}
    ).then(res => {
        result(null, res)
        console.log(res)}
    ).catch(err =>
        console.error(err))
}


Usuario.findByEmail = (user_sin_login, result) => {
    db.query('SELECT * FROM usuarios WHERE email = :mail',
            {replacements : {mail: user_sin_login}, type: db.QueryTypes.SELECT})
        .then(res => {
            result(null, res)
            })
        .catch(err => {console.log(err)})
};
/*
Usuario.findById = (userId, result) => {
    db.query('SELECT * FROM usuarios WHERE id = :id',
            {replacements : {id: userId}, type: db.QueryTypes.SELECT})
        .then(res => {
            result(null, res)
            })
        .catch(err => {console.log(err)})
};*/

module.exports = Usuario;
