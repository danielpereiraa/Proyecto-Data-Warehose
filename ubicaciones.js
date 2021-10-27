var display_regiones = () =>{

  var section = document.getElementById('region_ciudad').classList.contains("d-none");
  console.log(section);
  if(!section){
    return
  }
  /*
  adelante.removeEventListener("click", buscar_todos_contactos);
  atras.removeEventListener("click", pagina_anterior_contactos);
  adelante.addEventListener("click", buscar_todos);
  atras.addEventListener("click", pagina_anterior);
*/

  var seccion_contactos = document.getElementById('contactos').classList.contains("d-none");
  if(!seccion_contactos){
    document.getElementById('contactos').classList.toggle("d-none");
  }
  var seccion_usuarios = document.getElementById('usuarios').classList.contains("d-none");
  if(!seccion_usuarios){
    document.getElementById('usuarios').classList.toggle("d-none");
  }
  var seccion_compañias = document.getElementById('compañias').classList.contains("d-none");
  if(!seccion_compañias){
    document.getElementById('compañias').classList.toggle("d-none");
  }
  document.getElementById('region_ciudad').classList.toggle("d-none");
  var footer = document.getElementsByTagName('footer')[0].classList.contains("d-none");
  console.log(footer);
  if(!footer){
    document.getElementsByTagName('footer')[0].classList.toggle("d-none");  }
}

var boton_region = document.getElementById('boton_region');
boton_region.addEventListener("click", display_regiones)


var tree_view = () =>{

    var toggler = document.getElementsByClassName("caret");
    var i;


for (i = 0; i < toggler.length; i++) {

  toggler[i].addEventListener("click", function(event) {
    var region = event.target;
    var div = region.parentElement;

    div.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}
}


var obtenerRegion = async(i) =>{

  const response = await fetch('http://127.0.0.1:3000/v1/regiones')
  .then(response => response.json())
  .then(json => {

    for(var i = 0; i < json.length; i++){

      var myUL = document.getElementById('myUL');
      var li = document.createElement("LI");
      var div = document.createElement("DIV");
      var span =  document.createElement("SPAN");
      var text_li = document.createTextNode(json[i].nombre);
      var ul = document.createElement("UL");
      var myButton = document.createElement("BUTTON");
      var text_myButton = document.createTextNode("Agregar pais");
      var deleteButton = document.createElement("BUTTON");
      var text_deleteButton = document.createTextNode("Borrar");
      var updateButton = document.createElement("BUTTON");
      var text_updateButton = document.createTextNode("Editar");

      myButton.className = "btn btn-primary position_button";
      deleteButton.className = "btn btn-danger margin_left";
      deleteButton.addEventListener("click", delete_region);
      deleteButton.id = json[i].id;
      updateButton.className = "btn btn-warning margin_left_update";
      updateButton.id = json[i].id;

      myButton.setAttribute("data-target", "#modal_post_pais");
      myButton.setAttribute("data-toggle", "modal");
      myButton.id = json[i].id;
      myButton.addEventListener("click", eventoBotonRegion);
      updateButton.setAttribute("data-target", "#modal_put_region");
      updateButton.setAttribute("data-toggle", "modal");
      updateButton.addEventListener("click", eventoBotonRegion);

      li.className = "position_list"
      ul.id = "region" + json[i].id;
      ul.className = "nested"
      span.className = "caret";
      div.style.height = '40px';
      div.style.position = "relative"

 //     li.className = "d-flex justify-content-between"


      span.appendChild(text_li);
      div.appendChild(span);
      deleteButton.appendChild(text_deleteButton);
      div.appendChild(deleteButton);
      updateButton.appendChild(text_updateButton);
      div.appendChild(updateButton);


      li.appendChild(div);

      li.appendChild(ul);
      li.appendChild(myButton);

      myButton.appendChild(text_myButton);
      myUL.appendChild(li);

 


      obtenerPaises(json[i].id);

    }

  })
  .catch(e => {
    console.log(e);
    console.log(e.message);
  })


}
var call_me = async () =>{
  let val1 = await obtenerRegion();
  let val2 = await obtenerPaises();
  let val4 = tree_view();
}
call_me()


var obtenerPaises = async (id) =>{

  var regionId = id;
  var ul = document.getElementById('region' + regionId);





  const response = await fetch(`http://127.0.0.1:3000/v1/paises/${regionId}`)
  .then(response => response.json())
  .then(json => {



    for (var i = 0;i < json.length; i++){

      var pais = document.createElement("LI");
      var div = document.createElement("DIV");

      var span =  document.createElement("SPAN");
      var text_pais = document.createTextNode(json[i].nombre);
      var ul_ciudades = document.createElement("UL");
      var myButton = document.createElement("BUTTON");
      var text_myButton = document.createTextNode("Agregar ciudad");
      var deleteButton = document.createElement("BUTTON");
      var text_deleteButton = document.createTextNode("Borrar");
      var updateButton = document.createElement("BUTTON");
      var text_updateButton = document.createTextNode("Editar");

      myButton.className = "btn btn-primary position_button";
      myButton.setAttribute("data-target", "#modal_post_ciudad  ");
      myButton.setAttribute("data-toggle", "modal");
      myButton.id = json[i].id;
      myButton.addEventListener("click", eventoBoton);
      deleteButton.addEventListener("click", delete_pais);
      deleteButton.id = json[i].id;
      updateButton.setAttribute("data-target", "#modal_put_pais");
      updateButton.setAttribute("data-toggle", "modal");
      updateButton.className = "btn btn-warning margin_left_update";
      updateButton.addEventListener("click", eventoBoton);
      updateButton.addEventListener("click", obtener_regionID);


     // deleteButton.addEventListener("click", delete_region);
     updateButton.id = json[i].id;


      deleteButton.className = "btn btn-danger margin_left";
    //  deleteButton.id = json[i].id;

      pais.className = "position_list"
      ul_ciudades.id = "pais" + json[i].id;
      span.className = "caret";
      div.style.height = '40px';
      div.style.position = "relative"


     
      myButton.appendChild(text_myButton);
      pais.appendChild(myButton);
      span.appendChild(text_pais);
      div.appendChild(span);
      pais.appendChild(div);
      deleteButton.appendChild(text_deleteButton);
      div.appendChild(deleteButton);
      updateButton.appendChild(text_updateButton);
      div.appendChild(updateButton);
      pais.appendChild(ul_ciudades);
      
      if(ul !== null){
        ul.appendChild(pais);

      }


      obtenerCiudades(json[i].id);
      
    }
  })
  .catch(e => {
    console.log(e);
  })
}

var id_region_button = "";

var eventoBotonRegion = (event) => {



  id_region_button = event.target.id
}


var id_pais_button = "";

var eventoBoton = (event) => {
  console.log("PASO")


  id_pais_button = event.target.id 
  console.log(id_pais_button)

}

var obtenerCiudades = async (id) =>{

  var paisId = id;
  var ul = document.getElementById('pais' + paisId);


  const response = await fetch(`http://127.0.0.1:3000/v1/ciudades/${paisId}`)
  .then(response => response.json())
  .then(json => {

    for (var i = 0;i < json.length; i++){

      var ciudad = document.createElement("LI");
      var div = document.createElement("DIV");

      var span =  document.createElement("SPAN");
      var text_ciudad = document.createTextNode(json[i].nombre);
      var deleteButton = document.createElement("BUTTON");
      var text_deleteButton = document.createTextNode("Borrar");
      var updateButton = document.createElement("BUTTON");
      var text_updateButton = document.createTextNode("Editar");

      updateButton.className = "btn btn-warning margin_left_update";      
      updateButton.setAttribute("data-target", "#modal_put_ciudad");
      updateButton.setAttribute("data-toggle", "modal");
      deleteButton.className = "btn btn-danger margin_left";
      ul.className = "nested"
      ciudad.style.marginBottom = "2px";
      ciudad.id = "ciudad" + json[i].id;
      div.style.position = "relative";
      div.style.height = '40px';


      deleteButton.addEventListener("click", delete_ciudad);
      deleteButton.id = json[i].id;
      updateButton.addEventListener("click", obtener_ciudadID);
      updateButton.addEventListener("click", obtener_paisID);
      

      div.appendChild(span);
      span.appendChild(text_ciudad);
      ciudad.appendChild(div);
      deleteButton.appendChild(text_deleteButton);
      updateButton.appendChild(text_updateButton);
      div.appendChild(deleteButton);
      div.appendChild(updateButton);
      ul.appendChild(ciudad);
    }
  
  
  })
  .catch(e => {
    console.log(e);
    console.log(e.message);
  })

 
}

//POST

var post_region = async() =>{
  console.log("prueba");

  let nombre = document.getElementById("region_nombre").value;

  let data = {nombre}

    console.log(data);
  
    var endpoint = 'http://127.0.0.1:3000/v1/regiones';
  
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
  $('#modal_post_region').modal('hide');

}

var post_pais = async() =>{
  console.log(id_region_button);

  let nombre = document.getElementById("pais_nombre").value;
  let region_id = id_region_button;

  let data = {nombre, region_id}

    console.log(data);
  
    var endpoint = 'http://127.0.0.1:3000/v1/paises';
  
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

  $('#modal_post_pais').modal('hide');
  location.reload();

}

var post_ciudad = async() =>{
  console.log(id_pais_button);

  let nombre = document.getElementById("ciudad_nombre").value;
  let id_pais = id_pais_button;


  let data = {nombre, id_pais}

    console.log(data);
  
    var endpoint = 'http://127.0.0.1:3000/v1/ciudades';
  
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

  $('#modal_post_ciudad').modal('hide');
  location.reload();

}

//DELETE


var delete_region = async(event) =>{
  console.log(event.target.id)
  var id = event.target.id


  const response = await fetch(`http://127.0.0.1:3000/v1/regiones/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.text()) // or res.json()
  .then(res => console.log(res))
  
  location.reload();

}

var delete_pais = async(event) =>{
  console.log(event.target.id)
  var id = event.target.id


  const response = await fetch(`http://127.0.0.1:3000/v1/paises/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.text()) // or res.json()
  .then(res => console.log(res))
  
  location.reload();
 
}

var delete_ciudad = async(event) =>{
  console.log(event.target.id)
  var id = event.target.id


  const response = await fetch(`http://127.0.0.1:3000/v1/ciudades/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.text()) // or res.json()
  .then(res => console.log(res))
  
  location.reload();

}

//UPDATE


var update_region = async () => {
 
  let nombre = document.getElementById("region_put_nombre").value;

    let data = {nombre}

    console.log(data);
    let id = id_region_button;


    var endpoint = `http://127.0.0.1:3000/v1/regiones/${id}`;
  
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

var put_regionId = "";

var obtener_regionID = (event) => {
  console.log("PASOOOOO")

  var id_region_button = event.target;
  var parent = id_region_button.parentElement;
  var li = parent.parentElement
  var ul = li.parentElement.id
  //put_regionId = ul.charAt(ul.length - 1)

  var patt1 = /[0-9]/g;
  var digits = ul.match(patt1);

  if(digits.length == 1){
    put_regionId = ""
    put_regionId = digits[0]
  }else{
    put_regionId = ""

    for (i = 0; i < digits.length; i++) {
      
      put_regionId =  put_regionId + digits[i]
    }
  }

  console.log(put_regionId)
  console.log(digits)

}

var update_pais = async () => {
 
  let nombre = document.getElementById("pais_put_nombre").value;

    let id = id_pais_button;
    let region_id = put_regionId;
    console.log(region_id);
    
    let data = {region_id, nombre};

    var endpoint = `http://127.0.0.1:3000/v1/paises/${id}`;
  
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

  $('#modal_put_pais').modal('hide');
  location.reload();
  console.log(region_id);


  
}

var put_pais_id = ""
var obtener_paisID = (event) => {
  console.log("PRueba2")

  var evento = event.target;
  
  var parent = evento.parentElement;  
  var paisID = parent.parentElement.id;

  var patt1 = /[0-9]/g;
  var digits = paisID.match(patt1);
  
  if(digits.length == 1){
    put_pais_id = ""
    put_pais_id = digits[0]
  }else{
    put_pais_id = ""

    for (i = 0; i < digits.length; i++) {
      
      put_pais_id =  put_pais_id + digits[i]
    }
  }


  console.log(parent);
  console.log(put_pais_id);

}

var put_ciudad_id = ""
var obtener_ciudadID = (event) => {
  console.log("PRueba3")

  var evento = event.target;
  
  var parent = evento.parentElement;  
  var li = parent.parentElement.id;

  
  var patt1 = /[0-9]/g;
  var digits = li.match(patt1);  

  if(digits.length == 1){
    put_ciudad_id = ""
    put_ciudad_id = digits[0]
  }else{
    put_ciudad_id = ""

    for (i = 0; i < digits.length; i++) {
      
      put_ciudad_id =  put_ciudad_id + digits[i]
    }
  }
}

var update_ciudad = async () => {
 
  let nombre = document.getElementById("ciudad_put_nombre").value;


  let id = put_ciudad_id;
  let id_pais = put_pais_id;
  
  let data = {id_pais, nombre};
  console.log(id);
  console.log(data);
  
    var endpoint = `http://127.0.0.1:3000/v1/ciudades/${id}`;
  
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

  $('#modal_put_ciudad').modal('hide');
  location.reload();

}



