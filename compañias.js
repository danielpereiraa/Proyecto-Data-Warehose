var display_compañias = () =>{

  var section = document.getElementById('compañias').classList.contains("d-none");
  console.log(section);
  if(!section){
    return
  }
  
  adelante.removeEventListener("click", buscar_todos_contactos);
  atras.removeEventListener("click", pagina_anterior_contactos);
  adelante.addEventListener("click", buscar_todos);
  atras.addEventListener("click", pagina_anterior);

  var seccion_contactos = document.getElementById('contactos').classList.contains("d-none");
  if(!seccion_contactos){
    document.getElementById('contactos').classList.toggle("d-none");
  }
  var seccion_usuarios = document.getElementById('usuarios').classList.contains("d-none");
  if(!seccion_usuarios){
    document.getElementById('usuarios').classList.toggle("d-none");
  }
  var seccion_regiones = document.getElementById('region_ciudad').classList.contains("d-none");
  if(!seccion_regiones){
    document.getElementById('region_ciudad').classList.toggle("d-none");
  }
  primera_pagina();
  document.getElementById('compañias').classList.toggle("d-none");
  var footer = document.getElementsByTagName('footer')[0].classList.contains("d-none");
  console.log(footer);
  if(footer){
    document.getElementsByTagName('footer')[0].classList.toggle("d-none");  }

}

var boton_compañias = document.getElementById('boton_compañias');
boton_compañias.addEventListener("click", display_compañias)

//GET


var cuenta;
var obtenerCompañias = async (i) => {

  const response = await fetch('http://127.0.0.1:3000/v1/companies')
    .then(response => response.json())
    .then(json => {
      var count = Object.keys(json).length;
      cuenta = count;
   
      var tabla = document.getElementById('tabla_compañias');
  
      var hilera = document.createElement("tr");
  
      var box = document.createElement("td");
      var nombre = document.createElement("td");
      var direccion = document.createElement("td");
      var email = document.createElement("td");
      var telefono = document.createElement("td");
      var ciudad = document.createElement("td");
      var acciones = document.createElement("td");
  
      var x = document.createElement("INPUT");
      x.setAttribute("type", "checkbox");
      x.id = "check" + i;
     // console.log(x.id)
     // console.log(json[i].id)
      x.addEventListener('change', selectOnlyThis)

      var text_nombre = document.createTextNode(json[i].nombre_company);
      var text_direccion = document.createTextNode(json[i].direccion);
      var text_email = document.createTextNode(json[i].email);
      var text_telefono = document.createTextNode(json[i].telefono);
      var text_ciudad = document.createTextNode(json[i].nombre_ciudad);
      var deleteButton = document.createElement("BUTTON");
      var text_deleteButton = document.createTextNode("Borrar");
      var updateButton = document.createElement("BUTTON");
      var text_updateButton = document.createTextNode("Editar");

      deleteButton.className = "btn btn-danger";
      deleteButton.addEventListener("click", delete_compañia);
      deleteButton.id = "delete_company" + json[i].id;
      updateButton.className = "btn btn-warning";
      updateButton.id = "edit_company" + json[i].id;
      updateButton.setAttribute("data-target", "#modal_put_company");
      updateButton.setAttribute("data-toggle", "modal");
      updateButton.addEventListener("click", obtener_compañiaID);

      deleteButton.appendChild(text_deleteButton);
      updateButton.appendChild(text_updateButton);
      box.appendChild(x);
      nombre.appendChild(text_nombre);
      direccion.appendChild(text_direccion);
      email.appendChild(text_email);
      telefono.appendChild(text_telefono);
      ciudad.appendChild(text_ciudad);
      acciones.appendChild(deleteButton);
      acciones.appendChild(updateButton);
      
      hilera.appendChild(box);
      hilera.appendChild(nombre);
      hilera.appendChild(direccion);
      hilera.appendChild(email);
      hilera.appendChild(telefono);
      hilera.appendChild(ciudad);
      hilera.appendChild(acciones);
  
      tabla.appendChild(hilera);
  
  
    })
    .catch(e => {
      console.log(e);
      console.log(e.message);
    })
  
  
  
    }

var selectOnlyThis =(id) => {
  console.log(id.target.id)
  console.log(cuenta);
  for (var i = 0;i < cuenta; i++){
    document.getElementById("check" + i).checked = false;
  }

  document.getElementById(id.target.id).checked = true;
}
  
  var inicio = 1;
  var final = 10;
  

    var primera_pagina = async() =>{
      var inicio = 1;
      var final = 10;
      console.log(inicio);
      console.log(final);
      document.getElementById("tabla_compañias").innerHTML = "";

      var get_companies = await obtenerCompañias(0)

      for(var i = inicio; i < final; i++){
        obtenerCompañias(i)
      }
  
      console.log(inicio);
      console.log(final);

      document.getElementById('filas').innerHTML = "1-10 de " + cuenta + " filas";
    } 
    var pagina_intermedia = () =>{
      console.log(inicio);
      console.log(final);
      document.getElementById("tabla_compañias").innerHTML = "";

      for(var i = inicio; i < final; i++){
        obtenerCompañias(i)
      }
      console.log(inicio);
      console.log(final);
      

    } 
    var ultima_pagina = () =>{
      var primeraFila = inicio + 1;

      document.getElementById('filas').innerHTML = primeraFila + "-" + cuenta + " de " + cuenta + " filas";
  //    document.getElementById("adelante").removeEventListener("click", buscar_todos);
      document.getElementById("tabla_compañias").innerHTML = "";

      for(var i = inicio; i < cuenta; i++){
        obtenerCompañias(i)
      }
      
      //inicio += 10;
      final = cuenta;
      console.log(inicio);
      console.log(final);
      console.log(cuenta);

    } 

    var buscar_todos = async() =>{
    console.log(final > (cuenta + 10))
    if(inicio == 1){
  
    var myFuncionc = await primera_pagina();
    inicio = final;
    final +=10;

    }else if(final < cuenta){

      var primeraFila = inicio + 1;
      var ultimaFila = final;
      document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuenta + " filas";

      pagina_intermedia();

      inicio += 10;
      final +=10;

    }else{

      ultima_pagina();
      console.log(inicio);
      console.log(final);
    }
  }
  
  buscar_todos();
  var adelante = document.getElementById("adelante");

  var pagina_anterior = () =>{
    console.log(final);
    console.log(cuenta);

    console.log(final == cuenta);
    if(inicio == 10 ){
      primera_pagina(); 
      return
    }else if(final == cuenta){ 
      console.log(inicio);
      console.log(final);
      var primeraFila = inicio - 9;
      var ultimaFila = inicio;

      console.log(primeraFila);
      console.log(ultimaFila);
      final = inicio;
      inicio = inicio - 10;
      document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuenta + " filas";

      console.log("PASANDO")
      pagina_intermedia();

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
      document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuenta + " filas";

      console.log("PASANDO2")
      pagina_intermedia();

       inicio += 10;
      final +=10;

      console.log(inicio);
    console.log(final);
    }
  }
  var atras = document.getElementById("atras");


  //POST

  var post_compañia = async() =>{
 
    let nombre = document.getElementById("compañia_nombre").value;
    let direccion = document.getElementById("compañia_direccion").value;
    let email = document.getElementById("compañia_email").value;
    let telefono = document.getElementById("compañia_telefono").value;
    let ciudad_id = document.getElementById("compañia_ciudad").value;
  
    let data = {nombre, direccion, email, telefono, ciudad_id}

    console.log(data);
    
    var endpoint = 'http://127.0.0.1:3000/v1/companies';
        
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
    console.log(data);
    location.reload();
    $('#modal_nueva_company').modal('hide');
  
  }

//PUT
var id_compañia = "";
var obtener_compañiaID = (event) =>{
  var boton = event.target.id;
  var patt1 = /[0-9]/g;
  var digits = boton.match(patt1);

  if(digits.length == 1){
    id_compañia = ""
    id_compañia = digits[0]
  }else{
    id_compañia = ""

    for (i = 0; i < digits.length; i++) {
      
      id_compañia =  id_compañia + digits[i]
    }
  }

 console.log(id_compañia)
 console.log(digits)

}
var put_compañia = async () => {

  let nombre = document.getElementById("compañia_put_nombre").value;
  let direccion = document.getElementById("compañia_put_direccion").value;
  let email = document.getElementById("compañia_put_email").value;
  let telefono = document.getElementById("compañia_put_telefono").value;
  let ciudad_id = document.getElementById("compañia_put_ciudad").value;

  let data = {nombre, direccion, email, telefono, ciudad_id}

    console.log(data);

  let id = id_compañia;
  console.log(id);



    var endpoint = `http://127.0.0.1:3000/v1/companies/${id}`;
  
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

  $('#modal_put_region').modal('hide');
  location.reload();

}

//DELETE
var delete_compañia = async(event) =>{
  console.log(event.target.id)
  var boton = event.target.id
  var patt1 = /[0-9]/g;
  var digits = boton.match(patt1);
  var id_delelte_compañia = ""
  if(digits.length == 1){
    id_delelte_compañia = ""
    id_delelte_compañia = digits[0]
  }else{
    id_delelte_compañia = ""

    for (i = 0; i < digits.length; i++) {
      
      id_delelte_compañia =  id_delelte_compañia + digits[i]
    }
  }
  console.log(id_delelte_compañia);


  const response = await fetch(`http://127.0.0.1:3000/v1/companies/${id_delelte_compañia}`, {
    method: 'DELETE',
  })
  .then(res => res.text()) // or res.json()
  .then(res => console.log(res))
  
  location.reload();

}




