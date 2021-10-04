var tree_view = () =>{
    console.log("hello")
    var toggler = document.getElementsByClassName("caret");
    var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
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
      var span =  document.createElement("SPAN");
      var text_li = document.createTextNode(json[i].nombre);
      var ul = document.createElement("UL");
      var myButton = document.createElement("BUTTON");
      var text_myButton = document.createTextNode("Agregar pais");

      myButton.className = "btn btn-primary";
      myButton.setAttribute("data-target", "#modal_post_pais");
      myButton.setAttribute("data-toggle", "modal");
      myButton.id = json[i].id;
      myButton.addEventListener("click", eventoBotonRegion);

      ul.id = "region" + json[i].id;
      ul.className = "nested"
      span.className = "caret";
      li.className = "d-flex justify-content-between"


      span.appendChild(text_li);
      li.appendChild(span);

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

obtenerRegion();

var obtenerPaises = async (id) =>{

  var regionId = id;

  const response = await fetch(`http://127.0.0.1:3000/v1/paises/${regionId}`)
  .then(response => response.json())
  .then(json => {
    console.log(json.length);

    console.log(json[0].nombre);

    var ul = document.getElementById('region' + regionId);

    for (var i = 0;i < json.length; i++){

      var pais = document.createElement("LI");
      var span =  document.createElement("SPAN");
      var text_pais = document.createTextNode(json[i].nombre);
      var ul_ciudades = document.createElement("UL");
      var myButton = document.createElement("BUTTON");
      var text_myButton = document.createTextNode("Agregar ciudad");

      myButton.className = "btn btn-primary";
      myButton.setAttribute("data-target", "#modal_post_ciudad  ");
      myButton.setAttribute("data-toggle", "modal");
      myButton.id = json[i].id;
      myButton.addEventListener("click", eventoBoton);



      ul.className = "nested"
      ul_ciudades.className = "nested"
      ul_ciudades.id = "pais" + json[i].id;
      span.className = "caret";

      myButton.appendChild(text_myButton);
      pais.appendChild(myButton);
      span.appendChild(text_pais);
      pais.appendChild(span);
      pais.appendChild(ul_ciudades);
      ul.appendChild(pais);

      obtenerCiudades(json[i].id);
    }
  })
  .catch(e => {
    console.log(e);
    console.log(e.message);
  })
}

var id_region_button = "";

var eventoBotonRegion = (event) => {
  id_region_button = event.target.id 
}

var id_pais_button = "";

var eventoBoton = (event) => {
  id_pais_button = event.target.id 
}

var obtenerCiudades = async (id) =>{

  var paisId = id;

  const response = await fetch(`http://127.0.0.1:3000/v1/ciudades/${paisId}`)
  .then(response => response.json())
  .then(json => {
    console.log(json.length);

    console.log(json[0].nombre);

    var ul = document.getElementById('pais' + paisId);

    for (var i = 0;i < json.length; i++){

      var ciudad = document.createElement("LI");
      var span =  document.createElement("SPAN");
      var text_ciudad = document.createTextNode(json[i].nombre);

      ul.className = "nested"

      span.appendChild(text_ciudad);
      ciudad.appendChild(span);
      ul.appendChild(ciudad);
    }
  })
  .catch(e => {
    console.log(e);
    console.log(e.message);
  })
}

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

}

var post_ciudad = async() =>{
  console.log(id_pais_button);

  let nombre = document.getElementById("pais_nombre").value;
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

}