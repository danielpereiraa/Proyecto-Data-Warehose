var login = async () =>{

  let email = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  let data = {email, password}
  console.log(data.email);

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

  if (typeof json.token == 'undefined'){
    msg.classList.toggle("d-none")
  }else{
    if(json.admin == 0){
      nav_usuarios.classList.toggle("d-none");

    }

    section.classList.toggle("d-none");
    bienvenidos.classList.toggle("d-none");
    nav_menu.classList.toggle("d-none");

  }


  
  
 // document.getElementById("login_section").style.display = "none";


}

var display_usuarios =() =>{
  var bienvenidos = document.getElementById("bienvenidos")
  var usuarios = document.getElementById("usuarios")
  bienvenidos.classList.toggle("d-none")
  usuarios.classList.toggle("d-none")
  console.log("hola")

}

var obtenerUsuarios = async (i) => {

  const response = await fetch('http://127.0.0.1:3000/v1/usuarios')
  .then(response => response.json())
  .then(json => {

    var tabla = document.getElementById('tabla_usuarios');

    var hilera = document.createElement("tr");

    var box = document.createElement("td");
    var nombre = document.createElement("td");
    var apellido = document.createElement("td");
    var email = document.createElement("td");
    var perfil = document.createElement("td");
    var id = document.createElement("td");
    id.className = "d-none"

    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.id = "check" + i;
    console.log(x.id)
    console.log(json[i].id)
    x.addEventListener('change', selectOnlyThis)
    var text_nombre = document.createTextNode(json[i].nombre);
    var text_apellido = document.createTextNode(json[i].apellido);
    var text_email = document.createTextNode(json[i].email);
    var text_id = document.createTextNode(json[i].id);
    if(json[i].admin == 1){
      var text_perfil = document.createTextNode("Si");
    }else{
      var text_perfil = document.createTextNode("No");

    }

    box.appendChild(x);
    nombre.appendChild(text_nombre);
    apellido.appendChild(text_apellido);
    email.appendChild(text_email);
    perfil.appendChild(text_perfil);
    id.appendChild(text_id);

    
    hilera.appendChild(box);
    hilera.appendChild(nombre);
    hilera.appendChild(apellido);
    hilera.appendChild(email);
    hilera.appendChild(perfil);
    hilera.appendChild(id);

    tabla.appendChild(hilera);


  })
  .catch(e => {
    console.log(e);
    console.log(e.message);
  })



  }
var check_target = '';
  function selectOnlyThis(id) {
    console.log(id.target.id)
    check_target = id.target.id;

    var edit_boton =  document.getElementById("edit_boton")
  if(edit_boton.classList.contains("d-none")){
      edit_boton.classList.toggle("d-none");
    }

    
    for (var i = 0;i < 10; i++)
    {
      console.log(i)

        document.getElementById("check" + i).checked = false;
    }
    document.getElementById(id.target.id).checked = true;
}

var inicio = 0;
var final = 10  ;

var buscar_todos = () =>{

  for(var i = inicio; i < final; i++){
    obtenerUsuarios(i)
  }
  inicio += 10;
  final +=10;
}
//buscar_todos()

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

  }else{
    msg.classList.toggle("d-none")
  }
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
    var checkbox = document.getElementById(check_target)
    var td = checkbox.parentElement;
    var tr = td.parentElement;
    var id = tr.lastChild.textContent;
  
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

  //  document.getElementById('exampleModalCenter').modal.fade
  $('#exampleModalCenter2').modal('hide');

  }else{
    msg.classList.toggle("d-none")
  }
}

var delete_usuario = async() =>{

  
var checkbox = document.getElementById(check_target)
var td = checkbox.parentElement;
var tr = td.parentElement;
var id = tr.lastChild.textContent;
console.log(td.parentElement)
console.log(id)

console.log(checkbox)


  const response = await fetch(`http://127.0.0.1:3000/v1/usuarios/${id}`, {
  method: 'DELETE',
})
.then(res => res.text()) // or res.json()
.then(res => console.log(res))


}


