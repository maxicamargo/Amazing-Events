/*Variables globales*/
/*1° - Guardamos la direccion de la API en una variable*/
let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';

/*6° - Creo una variable tipo array vacio para guardar los datos de los eventos*/
let eventos = [];

/*Funciones asincronas*/
/*2° Traigo los datos de la API*/
async function getEventos(){
    try {
        /*3° Creo una variable que tendra la respuesta de la API*/
        let response = await fetch(urlAPI);
        
        /*4° Creo una variable para guardar los datos obtenidos al acceder al 
        archivo json del servidor*/
        let dataAPI = await response.json();
        
        /*Visualizo los datos obtenidos por consola*/
        //console.log(dataAPI);
        
        /*6° - Completo el array de eventos con los datos obtenidos del API*/
        for (let evento of dataAPI.events){
            eventos.push(evento);
        }
        
        /*Visualizo el array con los eventos por consola*/
        //console.log(eventos);
        
        /*7° - Guardamos los parametros de una URL*/
        let queryString = location.search;
        /*Visualizo el array con los eventos por consola*/
        //console.log(queryString)

        /*8° - Con esos datos creo un objeto tipo URLSearchParams*/
        let params = new URLSearchParams(queryString);
        /*Visualizo el array con los eventos por consola*/
        //console.log(params)

        /*9° - Utilizo el metodo get del objeto para obtener el valor del parametro id*/
        let id = params.get("id");
        /*Visualizo el array con los eventos por consola*/
        //console.log(id)

        /*10 - Creo una variable para guardar los datos del evento que encontramos
        segun el id obtenido*/
        let evento = eventos.find(evento=>evento._id == id);
        
        /*Visualizo el array con los eventos por consola*/
        //console.log(evento)

        /*11 - Armo el html y lo inserto en la card de la pagina details*/
        document.querySelector(".card").innerHTML = `<div class="row g-0 
        text-center border m-2">
        <div class="col-md-6 m5">
            <img src="${evento.image}" id="${evento._id}" class="img-fluid" 
            alt="Evento ${evento.name}">
        </div>
        <div class="col-md-6 border">
            <div class="card-body">
                <h5 class="card-title fw-bold">${evento.name}</h5>
                <p class="card-text">${evento.description}</p>
                <p class="card-text"><b>Capacity: </b> ${evento.capacity}</p>
                <p class="card-text"><b>Place: </b> ${evento.place}</p>
                <p class="card-text"><b>Price: </b> $ ${evento.price}</p>
            </div>
        </div>
    </div>`

    } catch (error) {
        console.log(error.message);
    }

}

/*5° - Llamo a la funcion para corroborar la conexion, los datos obtenidos y 
la funcionalidad de la logica*/
getEventos();
