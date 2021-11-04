var display_usuarios =() =>{

  adelante.removeEventListener("click", buscar_todos_contactos);
  atras.removeEventListener("click", pagina_anterior_contactos);
  adelante.removeEventListener("click", buscar_todos);
  atras.removeEventListener("click", pagina_anterior);
  adelante.addEventListener("click", buscar_todos_usuarios);
  atras.addEventListener("click", pagina_anterior_usuarios);
 // var bienvenidos = document.getElementById("bienvenidos");
  var usuarios = document.getElementById("usuarios").classList.contains("d-none");
  if(!usuarios){
    return
  }
  var seccion_welcome = document.getElementById('bienvenidos').classList.contains("d-none");
  if(!seccion_welcome){
    document.getElementById('bienvenidos').classList.toggle("d-none");
  }
  var seccion_contactos = document.getElementById('contactos').classList.contains("d-none");
  if(!seccion_contactos){
    document.getElementById('contactos').classList.toggle("d-none");
  }
  var seccion_compañias = document.getElementById('compañias').classList.contains("d-none");
  if(!seccion_compañias){
    document.getElementById('compañias').classList.toggle("d-none");
  }
  var seccion_regiones = document.getElementById('region_ciudad').classList.contains("d-none");
  if(!seccion_regiones){
    document.getElementById('region_ciudad').classList.toggle("d-none");
  }
 // bienvenidos.classList.toggle("d-none");
  document.getElementById("usuarios").classList.toggle("d-none");
  console.log("hola");
  buscar_todos_usuarios();

  var footer = document.getElementsByTagName('footer')[0].classList.contains("d-none");
  if(footer){
    document.getElementsByTagName('footer')[0].classList.toggle("d-none");  }



}

var boton_usuarios = document.getElementById('usuarios');
boton_usuarios.addEventListener("click", display_usuarios)

//LOGIN
var login = async () =>{

  let email = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  let data = {email, password}
  console.log(data);

  var endpoint = 'http://127.0.0.1:3000/v1/login';

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  const json  = await response.json()
  .catch(e => {
    console.log(e);
    console.log(e.message);
  })
  
  console.log(json);
  console.log(json.token);  
  console.log(json.admin);

  console.log("json.token")

  localStorage.setItem("token", json.token)

  var msg = document.getElementById("warning")
  var section = document.getElementById("login_section");
  var bienvenidos = document.getElementById("bienvenidos")
  var nav_menu = document.getElementById("nav_menu")
  var nav_usuarios = document.getElementById("nav_usuarios")
  var token_local = localStorage.getItem("token");
    console.log(token_local)
    console.log(typeof token_local !== 'undefined')
  if (typeof json.token == 'undefined'){
    msg.classList.toggle("d-none")
  }else{
    if(json.admin == 0){

      nav_usuarios.classList.toggle("d-none");
      console.log(json.admin);

    }
    console.log(json.admin);

    section.classList.toggle("d-none");
    bienvenidos.classList.toggle("d-none");
    nav_menu.classList.toggle("d-none");

  
    

  }


  
  
 // document.getElementById("login_section").style.display = "none";


}

//GET

var cuentaUsuarios;

var obtenerUsuarios = async (i) => {

  const response = await fetch('http://127.0.0.1:3000/v1/usuarios')
  .then(response => response.json())
  .then(json => {

    var count = Object.keys(json).length;
    cuentaUsuarios = count;

    var tabla = document.getElementById('tabla_usuarios');

    var hilera = document.createElement("tr");

    var nombre = document.createElement("td");
    var apellido = document.createElement("td");
    var email = document.createElement("td");
    var perfil = document.createElement("td");
    var id = document.createElement("td");
    id.className = "d-none"
    var acciones = document.createElement("td");


  //  x.addEventListener('change', selectOnlyThis)
    var text_nombre = document.createTextNode(json[i].nombre);
    var text_apellido = document.createTextNode(json[i].apellido);
    var text_email = document.createTextNode(json[i].email);
    var text_id = document.createTextNode(json[i].id);
    if(json[i].admin == 1){
      var text_perfil = document.createTextNode("Si");
    }else{
      var text_perfil = document.createTextNode("No");

    }
    var deleteButton = document.createElement("BUTTON");
    var text_deleteButton = document.createTextNode("Borrar");
    var updateButton = document.createElement("BUTTON");
    var text_updateButton = document.createTextNode("Editar");

    deleteButton.className = "btn btn-danger";
    deleteButton.addEventListener("click", delete_usuario);
    deleteButton.id = "delete_user" + json[i].id;
    updateButton.className = "btn btn-warning";
    updateButton.id = "edit_user" + json[i].id;
    updateButton.setAttribute("data-target", "#edit_users");
    updateButton.setAttribute("data-toggle", "modal");
    updateButton.addEventListener("click", obtener_usuarioID);

    deleteButton.appendChild(text_deleteButton);
    updateButton.appendChild(text_updateButton);
    nombre.appendChild(text_nombre);
    apellido.appendChild(text_apellido);
    email.appendChild(text_email);
    perfil.appendChild(text_perfil);
    id.appendChild(text_id);
    acciones.appendChild(deleteButton);
    acciones.appendChild(updateButton);

    hilera.appendChild(nombre);
    hilera.appendChild(apellido);
    hilera.appendChild(email);
    hilera.appendChild(perfil);
    hilera.appendChild(id);
    hilera.appendChild(acciones);

    tabla.appendChild(hilera);


  })
  .catch(e => {
    console.log(e);
    console.log(e.message);
  })



  }
var inicio = 0;
var final = 10 ;

var primera_pagina_usuarios = async() =>{
  var inicio = 1;
  var final = 10;
  console.log(inicio);
  console.log(final);
  document.getElementById("tabla_usuarios").innerHTML = "";

  var get_usuario = await obtenerUsuarios(0)

  if(cuentaUsuarios < final){
    console.log('PRue')
    for(var i = inicio; i < cuentaUsuarios; i++){
      obtenerUsuarios(i)
    }
    document.getElementById("filas").innerHTML = "";  
    document.getElementById('filas').innerHTML = "1-" + cuentaUsuarios +" de " + cuentaUsuarios + " filas";
  }else{

  for(var i = inicio; i < final; i++){
    obtenerUsuarios(i)
  }

  console.log(inicio);
  console.log(cuentaUsuarios);

  document.getElementById('filas').innerHTML = "1-10 de " + cuentaUsuarios + " filas";
  }
} 
var pagina_intermedia_usuarios = () =>{
  console.log(inicio);
  console.log(final);
  document.getElementById("tabla_usuarios").innerHTML = "";

  for(var i = inicio; i < final; i++){
    obtenerUsuarios(i)
  }
  console.log(inicio);
  console.log(final);
  

} 
var ultima_pagina_usuarios = () =>{
  var primeraFila = inicio + 1;

  document.getElementById('filas').innerHTML = primeraFila + "-" + cuentaUsuarios + " de " + cuentaUsuarios + " filas";
//    document.getElementById("adelante").removeEventListener("click", buscar_todos);
  document.getElementById("tabla_usuarios").innerHTML = "";

  for(var i = inicio; i < cuentaUsuarios; i++){
    obtenerUsuarios(i)
  }
  
  //inicio += 10;

    final = cuentaUsuarios;

  



} 
var buscar_todos_usuarios = async() =>{
  console.log(inicio)
  if(inicio == 1){

  var myFuncionc = await primera_pagina_usuarios();
  if(cuentaUsuarios <= 10){
    return
  }else if(cuentaUsuarios <= 20){
    inicio = final;
    final = cuentaUsuarios
  }else if(cuentaUsuarios > 20){
    inicio = final;
    final = final + 10;
  }

  }else if(final < cuentaUsuarios){

    var primeraFila = inicio + 1;
    var ultimaFila = final;
    document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuentaUsuarios + " filas";

    pagina_intermedia_usuarios();

    inicio += 10;
    final +=10;

  }else{

    ultima_pagina_usuarios();
    console.log(inicio);
    console.log(final);
  }
}

//buscar_todos_usuarios()
var pagina_anterior_usuarios = () =>{
  console.log(inicio);
  console.log(cuentaUsuarios);

  if(inicio == 1){
    console.log("NEW")

    return
  }else if(inicio == 10){
    primera_pagina_usuarios(); 
    return
  }else if(final == cuentaUsuarios){ 
    console.log(inicio);
    console.log(final);
    var primeraFila = inicio - 9;
    var ultimaFila = inicio;

    console.log(primeraFila);
    console.log(ultimaFila);
    final = inicio;
    inicio = inicio - 10;
    document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuentaUsuarios + " filas";

    console.log("PASANDO")
    pagina_intermedia_usuarios();

    inicio += 10;
    final +=10;
    console.log(inicio);
    console.log(final);
   

    

  }else{

    console.log(inicio);
    console.log(final);
   



  //  final = inicio;
  //  inicio = inicio - 10;

    inicio = inicio - 20;
    final = inicio + 10;

    var primeraFila = inicio + 1;
    var ultimaFila = final;
    console.log(primeraFila);
    console.log(ultimaFila);
    document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuentaUsuarios + " filas";

    console.log("PASANDO2")
    pagina_intermedia_usuarios();

     inicio += 10;
    final +=10;

    console.log(inicio);
  console.log(final);
  }
}
var atras = document.getElementById("atras");


//POST

var post_usuario = async() =>{
  console.log("prueba");

  let nombre = document.getElementById("user_nombre").value;
  let apellido = document.getElementById("user_apellido").value;
  let email = document.getElementById("user_email").value;
  let admin = document.getElementById("user_admin").value;
  let password = document.getElementById("user_password").value;
  let repeat_password = document.getElementById("user_paswordx2").value;

  var msg = document.getElementById("warning_password");


  if(password == repeat_password){
    let data = {nombre, apellido, email, admin, password}

    console.log("data");
  
    var endpoint = 'http://127.0.0.1:3000/v1/usuarios';
  
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    const json  = await response.json()
    .catch(e => {
      console.log(e);
      console.log(e.message);
    })
    console.log("hola");

  //  document.getElementById('exampleModalCenter').modal.fade
  $('#exampleModalCenter').modal('hide');
  buscar_todos_usuarios();

  }else{
    msg.classList.toggle("d-none")
  }
}

var reset_usuario_post = () => {
  document.getElementById('user_nombre').value = "";
  document.getElementById('user_apellido').value = "";
  document.getElementById('user_Email').value = "";
  document.getElementById('user_admin').value = "";
  document.getElementById('user_password').value = "";
  document.getElementById('user_paswordx2').value = "";
}

var clear_usuario_post = document.getElementById('guardar_user');
clear_usuario_post.addEventListener("click", reset_usuario_post)


//PUT
var update_id = "";

var obtener_usuarioID = (event) =>{
  var boton = event.target.id;
  var patt1 = /[0-9]/g;
  var digits = boton.match(patt1);

  if(digits.length == 1){
    update_id = ""
    update_id = digits[0]
  }else{
    update_id = ""

    for (i = 0; i < digits.length; i++) {
      
      update_id =  update_id + digits[i]
    }
  }
  
 console.log(update_id)
 console.log(digits)

}

var update_usuario = async () => {
 
  let nombre = document.getElementById("user_nombre_edit").value;
  let apellido = document.getElementById("user_apellido_edit").value;
  let email = document.getElementById("user_email_edit").value;
  let admin = document.getElementById("user_admin_edit").value;
  let password = document.getElementById("user_password_edit").value;
  let repeat_password = document.getElementById("user_paswordx2_edit").value;

  var msg = document.getElementById("warning_password2");


  if(password == repeat_password){
    let data = {nombre, apellido, email, admin, password}

    console.log(data);

    var id = update_id
    console.log(id);

    var endpoint = `http://127.0.0.1:3000/v1/usuarios/${id}`;
  
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    const json  = await response.json()
    .catch(e => {
      console.log(e);
      console.log(e.message);
    })

  $('#edit_users').modal('hide');
  buscar_todos_usuarios();

  }else{
    msg.classList.toggle("d-none")
  }
}

var reset_usuario_put = () => {
document.getElementById('user_nombre').value = "";
document.getElementById('user_apellido').value = "";
document.getElementById('user_Email').value = "";
document.getElementById('user_admin').value = "";
document.getElementById('user_password').value = "";
document.getElementById('user_paswordx2').value = "";
}

var clear_usuario_put = document.getElementById('edit_usuario');
clear_usuario_put.addEventListener("click", reset_usuario_put)

//DELETE

var delete_usuario = async(event) =>{

  console.log(event.target.id)
  var boton = event.target.id
  var patt1 = /[0-9]/g;
  var digits = boton.match(patt1);
  var id_delelte_user = ""
  if(digits.length == 1){
    id_delelte_user = ""
    id_delelte_user = digits[0]
  }else{
    id_delelte_user = ""

    for (i = 0; i < digits.length; i++) {
      
      id_delelte_user =  id_delelte_user + digits[i]
    }
  }
  console.log(id_delelte_user);

  const response = await fetch(`http://127.0.0.1:3000/v1/usuarios/${id_delelte_user}`, {
  method: 'DELETE',
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))

buscar_todos_usuarios();

}


