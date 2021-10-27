var cuenta_contactos;
  var inicio = 1;
  var final = 10;

var display_contactos = () =>{

  var section = document.getElementById('contactos').classList.contains("d-none");
  console.log(section);
  if(!section){
    return
  }
  
  adelante.removeEventListener("click", buscar_todos);
  atras.removeEventListener("click", pagina_anterior);
  adelante.addEventListener("click", buscar_todos_contactos);
  atras.addEventListener("click", pagina_anterior_contactos);

  var seccion_compañias = document.getElementById('compañias').classList.contains("d-none");
  if(!seccion_compañias){
    document.getElementById('compañias').classList.toggle("d-none");
  }
  var seccion_usuarios = document.getElementById('usuarios').classList.contains("d-none");
  if(!seccion_usuarios){
    document.getElementById('usuarios').classList.toggle("d-none");
  }
  var seccion_regiones = document.getElementById('region_ciudad').classList.contains("d-none");
  if(!seccion_regiones){
    document.getElementById('region_ciudad').classList.toggle("d-none");
  }
  document.getElementById('contactos').classList.toggle("d-none");
  primera_pagina_contactos();


  console.log(section);


  var footer = document.getElementsByTagName('footer')[0].classList.contains("d-none");
  console.log(footer);
  if(footer){
    document.getElementsByTagName('footer')[0].classList.toggle("d-none");  
  }
}

var boton_contactos = document.getElementById('boton_contactos');
boton_contactos.addEventListener("click", display_contactos)



//GET

  var obtenerContactos = async (i) => {

    const response = await fetch('http://127.0.0.1:3000/v1/contactos')
    .then(response => response.json())
    .then(json => {

    var count = Object.keys(json).length;
    cuenta_contactos = count;
  

    creacion_hileras(json, i);
  
    })
    .catch(e => {
      console.log(e);
      console.log(e.message);
    })
}

var creacion_hileras = (json, i) => {
  
  var tabla = document.getElementById('tabla_contactos');
  var hilera = document.createElement("tr");

  var box = document.createElement("td");
  var contacto = document.createElement("td");
  var email = document.createElement("td");
  var company = document.createElement("td");
  var pais = document.createElement("td");
  var direccion = document.createElement("td");
  var acciones = document.createElement("td");

 // id.className = "d-none"

  var x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox");
  x.addEventListener("change", sumaSeleccionados)
  x.id = "contacto" + json[i].id;
  x.className = "box_contacto";
  var text_contacto = document.createTextNode(json[i].nombre_contacto + " " + json[i].apellido_contacto );
  var text_pais = document.createTextNode(json[i].nombre);
  var text_company = document.createTextNode(json[i].nombre_company);
  var text_email = document.createTextNode(json[i].email);
  var text_direccion = document.createTextNode(json[i].direccion);
  var updateButton = document.createElement("BUTTON");
  var text_updateButton = document.createTextNode("Editar");
  var deleteButton = document.createElement("BUTTON");
  var text_deleteButton = document.createTextNode("Borrar");
    // var text_id = document.createTextNode(json[i].id);
deleteButton.className = "btn btn-danger";
deleteButton.addEventListener("click", obtener_contacto_delete_ID);
deleteButton.id = "delete_contact" + json[i].id;
deleteButton.setAttribute("data-target", "#modal_delete_contacto");
deleteButton.setAttribute("data-toggle", "modal");
     
updateButton.className = "btn btn-warning";
updateButton.id = "edit_contacto" + json[i].id;
updateButton.setAttribute("data-target", "#modal_put_contacto");
updateButton.setAttribute("data-toggle", "modal");
updateButton.addEventListener("click", obtener_contactoID);
   
deleteButton.appendChild(text_deleteButton);
box.appendChild(x);
contacto.appendChild(text_contacto);
email.appendChild(text_email);
company.appendChild(text_company);
pais.appendChild(text_pais);
direccion.appendChild(text_direccion);
updateButton.appendChild(text_updateButton);
acciones.appendChild(deleteButton);

acciones.appendChild(updateButton);


//id.appendChild(text_id);

  
  hilera.appendChild(box);
  hilera.appendChild(contacto);
  hilera.appendChild(email);
  hilera.appendChild(company);
  hilera.appendChild(pais);
  hilera.appendChild(direccion);
  hilera.appendChild(acciones);

 // hilera.appendChild(id);

  tabla.appendChild(hilera);
}


var primera_pagina_contactos = async() =>{
  var inicio = 1;
  var final = 10;
  console.log(inicio);
  console.log(final);
  document.getElementById("tabla_contactos").innerHTML = "";

  var get_contactos = await obtenerContactos(0)

  for(var i = inicio; i < final; i++){
    obtenerContactos(i)
  }

  console.log(inicio);
  console.log(final);

  document.getElementById("filas").innerHTML = "";
  document.getElementById('filas').innerHTML = "1-10 de " + cuenta_contactos + " filas";
} 
var pagina_intermedia_contactos = () =>{
  console.log(inicio);
  console.log(final);
  document.getElementById("tabla_contactos").innerHTML = "";

  for(var i = inicio; i < final; i++){
    obtenerContactos(i)
  }
  console.log(inicio);
  console.log(final);
  

} 
var ultima_pagina_contactos = () =>{
  var primeraFila = inicio + 1;

  document.getElementById('filas').innerHTML = primeraFila + "-" + cuenta_contactos + " de " + cuenta_contactos + " filas";
  document.getElementById("tabla_contactos").innerHTML = "";

  for(var i = inicio; i < cuenta_contactos; i++){
    obtenerContactos(i)
  }
  
  //inicio += 10;
  final = cuenta_contactos;
  console.log(inicio);
  console.log(final);
} 

var buscar_todos_contactos = async() =>{
  console.log(inicio)
  console.log(final)
  console.log(final < cuenta_contactos);

  if(inicio == 1){
    var myFuncionc = await primera_pagina_contactos();
  }else if(final < cuenta_contactos){
    console.log(inicio);
    console.log(final);
    var primeraFila = inicio + 1;
    var ultimaFila = final;
    document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuenta_contactos + " filas";

    pagina_intermedia_contactos();

    inicio += 10;
    final +=10;

  }else{

    ultima_pagina_contactos();
    
  }
}

//buscar_todos_contactos();


var adelante = document.getElementById("adelante");

var pagina_anterior_contactos = () =>{
 
  if(inicio == 10 ){
    return
  }else if(final == cuenta_contactos){ 
    console.log(inicio);
    console.log(final);
    var primeraFila = inicio - 9;
    var ultimaFila = inicio;

    console.log(primeraFila);
    console.log(ultimaFila);
    final = inicio;
    inicio = inicio - 10;
    document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuenta_contactos + " filas";

    console.log("PASANDO")
    pagina_intermedia_contactos();

    inicio += 10;
    final +=10;


    

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
    document.getElementById('filas').innerHTML = primeraFila + "-" + ultimaFila + " de " + cuenta_contactos + " filas";

    console.log("PASANDO2")
    pagina_intermedia_contactos();

     inicio += 10;
    final +=10;

    console.log(inicio);
  console.log(final);
  }
}
var atras = document.getElementById("atras");





var cuentaSeleccionados = 0;
var sumaSeleccionados = (event) =>{
    console.log(event.target.checked);
    if(document.getElementById("cantidad_seleccionados").classList.contains("d-none")){
        document.getElementById("cantidad_seleccionados").classList.toggle("d-none")
        document.getElementById("eliminar_contactos").classList.toggle("d-none")
    }

 

    if(event.target.checked == true){
        if(cuentaSeleccionados == 0){
            cuentaSeleccionados =  cuentaSeleccionados + 1;
            console.log(cuentaSeleccionados)
            document.getElementById("cantidad_seleccionados").innerHTML = cuentaSeleccionados + " selecionado";
        }else{
            cuentaSeleccionados =  cuentaSeleccionados + 1;
            console.log(cuentaSeleccionados)
            document.getElementById("cantidad_seleccionados").innerHTML = cuentaSeleccionados + " selecionados";
        }
    }else{
        if(cuentaSeleccionados == 1){
            document.getElementById("cantidad_seleccionados").classList.toggle("d-none");
            document.getElementById("eliminar_contactos").classList.toggle("d-none");
            cuentaSeleccionados =  cuentaSeleccionados - 1;

        }else if(cuentaSeleccionados == 2){
            cuentaSeleccionados =  cuentaSeleccionados - 1;
            console.log(cuentaSeleccionados)
            document.getElementById("cantidad_seleccionados").innerHTML = cuentaSeleccionados + " selecionado";
        }else{


            cuentaSeleccionados =  cuentaSeleccionados - 1;
            console.log(cuentaSeleccionados)
            document.getElementById("cantidad_seleccionados").innerHTML = cuentaSeleccionados + " selecionados";
        }
    }

    

   }

var buscar_por_input = async () => {

  let input = document.getElementById("exampleInputEmail1").value;

  let fetch1= await fetch(`http://127.0.0.1:3000/v1/contactos/${input}`)
  .then(response => response.json())
  .then(json => {
    console.log(json)


    if(json.length == 0){
      return
    }else{
      document.getElementById("tabla_contactos").innerHTML = "";
      for (i = 0; i < json.length; i++) {
        console.log(json)
        console.log(i)
        
        creacion_hileras(json, i)
  
    }
    }
    

  }).catch(e => {
    console.log(e.message);
  })

  
}

//POST

var post_contacto = async() =>{
  
    let nombre_contacto = document.getElementById("contacto_nombre").value;
    let apellido_contacto = document.getElementById("contacto_apellido").value;
    let email = document.getElementById("contacto_Email").value;
    let pais = document.getElementById("contacto_pais").value;
    let nombre_company = document.getElementById("contacto_compañia").value;
    let direccion = document.getElementById("contacto_direccion").value;  
  
      let data = {nombre_contacto, apellido_contacto, email, pais, nombre_company, direccion}
      
      console.log(data)
      var endpoint = 'http://127.0.0.1:3000/v1/contactos';
    
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

   //location.reload();
    $('#modal_nuevo_contacto').modal('hide');
  
  
  }

//PUT 

  var id_contacto = "";
var obtener_contactoID = (event) =>{
  var boton = event.target.id;
  var patt1 = /[0-9]/g;
  var digits = boton.match(patt1);

  if(digits.length == 1){
    id_contacto = ""
    id_contacto = digits[0]
  }else{
    id_contacto = ""

    for (i = 0; i < digits.length; i++) {
      
        id_contacto =  id_contacto + digits[i]
    }
  }
  
 console.log(id_contacto)
 console.log(digits)

}
var put_contacto = async() => {

let nombre_contacto = document.getElementById("contacto_put_nombre").value;
let apellido_contacto = document.getElementById("contacto_put_apellido").value;
let email = document.getElementById("contacto_put_email").value;
let pais = document.getElementById("contacto_put_pais").value;
let nombre_company = document.getElementById("contacto_put_compañia").value;
let direccion = document.getElementById("contacto_put_direccion").value;


    let data = {nombre_contacto, apellido_contacto, email, pais, nombre_company, direccion}

    var id = id_contacto
    console.log(id);

    var endpoint = `http://127.0.0.1:3000/v1/contactos/${id}`;

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
$('#modal_put_contacto').modal('hide');
location.reload();


}

//DELETE 

var id_delete_contacto = "";
var obtener_contacto_delete_ID = (event) =>{
    var boton = event.target.id
    var patt1 = /[0-9]/g;
    var digits = boton.match(patt1);
    id_delete_contacto = ""
    if(digits.length == 1){
        id_delete_contacto = ""
        id_delete_contacto = digits[0]
    }else{
        id_delete_contacto = ""
  
      for (i = 0; i < digits.length; i++) {
        
        id_delete_contacto =  id_delete_contacto + digits[i]
      }
    }
    console.log(id_delete_contacto);

}

var delete_contacto = async() =>{
    var contactoId = id_delete_contacto;
    console.log(contactoId)

  
  
    const response = await fetch(`http://127.0.0.1:3000/v1/contactos/${contactoId}`, {
      method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
    
    location.reload();
  
  }

var eliminar_varios = () =>{
    var boxes = document.getElementsByClassName('box_contacto');

    for(var i = 0; i < 10; i++){
        var box = boxes[i]
        var id = box.id;
        console.log(id)


        if(box.checked == true){
            console.log(id)

            var patt1 = /[0-9]/g;
            var digits = id.match(patt1);
            id_delete_contacto = ""
            if(digits.length == 1){
                id_delete_contacto = ""
                id_delete_contacto = digits[0]
            }else{
                id_delete_contacto = ""
          
              for (i = 0; i < digits.length; i++) {
                
                id_delete_contacto =  id_delete_contacto + digits[i]
              }
            }
            delete_contacto()
        }
      //  console.log(contacto)
      //  console.log(digits);
    }
   // delete_contacto()
}
