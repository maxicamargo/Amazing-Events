/*Variables globales*/
/*1° - Guardamos la direccion de la API en una variable*/
let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';

/*6° - Creo una variable tipo array vacio para guardar los datos de los eventos*/
let eventos = [];

/*7° - Creo un variable para almacenar la fecha con la cual vamos a separar los 
eventos*/
let currentData;

/*13° - Creo una variable tipo array vacio para guardar los tipos de eventos*/
let categorias = [];

/*18° - Creamos una variable que toma los datos del input de busqueda y una 
varible que toma el estado del boton*/
/*Escucho el input*/
let inputBusqueda = document.querySelector("input[name=search]");
/*Escucho el boton*/
let boton = document.querySelector("button[name=button]");

/*20° - Creo una variable que va a contener los checkboxes tildados*/
let checkboxes;

/*24° - Creo una variable que informara un mensaje cuando no se encuentren los 
eventos buscados*/
let mensaje = document.querySelector(".mensaje")

/*Funciones asincronas*/
/*2° Traigo los datos de la API*/
async function getEventos(){
    try {
        /*3° Creo una variable que tendra la respuesta de la API*/
        let response = await fetch(urlAPI);
        
        /*4° Creo una variable para guardar los datos obtenidos al acceder al 
        archivo json del servidor*/
        let dataAPI = await response.json();
        
        /*Visualizo los datos obtenidos por consola para verificar el formato de 
        los mismos*/
        //console.log(dataAPI);
        
        /*8° - Completo el array de eventos con los datos obtenidos del API*/
        currentData = new Date(dataAPI.currentDate);
        
        /*9° - Completo el array de eventos posteriores a la fecha contenida en 
        currentDatecon los datos obtenidos del API*/
        for (let evento of dataAPI.events){
            let eventDate = new Date(evento.date);
            if(eventDate<currentData){
                eventos.push(evento);
            }   
        }

        /*Visualizo el array con los eventos por consola*/
        //console.log(eventos);

        /*10° Ahora que tengo los eventos en un array puedo hacer una funcion que 
        renderize las cards con los datos de los eventos*/
        renderCards(eventos);

        /*14° Extraemos del array de eventos los tipos de eventos, usando una funcion*/
        categorias = extractCategory(eventos);

        /*16° Creo una funcion que me crear los checkboxes*/
        renderCheckboxes(categorias);

        /*21° - Agrego un eventListener a los checkboxes creados de forma dinamica y 
        comienzo a leer el estado de cada uno de los mismos*/
        checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change",()=>{
            /*Visualizo el array con los eventos por consola*/
            //console.log(checkbox.value);
            renderSearch();
        });

    });    

    } catch (error) {
        console.log(error.message);
    }
}


/*5° - Llamo a la funcion para corroborar la conexion, los datos obtenidos y 
la funcionalidad de la logica*/
getEventos();


/*Funciones*/
/*11° - Creo la funcion que renderiza e injecta las cards en el documento HTML*/
function renderCards(eventos){
    let container = document.querySelector(".row");
    let htmlCards = "";
    eventos.forEach(evento => htmlCards += createdCard(evento));
    container.innerHTML = htmlCards
}

/*12° - Creo la funcion que crea la card*/
function createdCard(evento){
    return `<div class="col-sm-12 col-md-6 col-xl-3 py-2">
    <div class="card">
        <div class="card-body text-center">
            <img src="${evento.image}" class="card_img card-img-top" alt="${evento.name}">
            <h5 class="card-title mt-2 fw-bold ">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
            <div class="d-flex justify-content-between mt-5">
                <p>Price: $ ${evento.price}
                <p>
                <a class="card_btn btn btn-outline-dark" href="./details.html?id=${evento._id}" role="button">Ver mas</a>
            </div>
        </div>
    </div>
</div>`;
}

/*15° - Creo una funcion que extrae las categorias de los eventos del array 
obtenido de la API y los guarda en un array*/
function extractCategory(eventos){
    let category = [];
    eventos.forEach(evento =>{
        if(!category.includes(evento.category)){
            category.push(evento.category);
        }
    });
    /*Visualizo el array con los eventos por consola*/
    //console.log(category);
    return category;
}

/*17° - Funcion que renderiza, arma e injecta los checkboxes en el html*/
function renderCheckboxes(categorias){
    let container = document.querySelector(".main_form_izq");
    container.innerHTML = categorias.map(categoria =>
        `<label>
        <input type = "checkbox" name="types" 
        value="${categoria}">
        <span>${categoria}</span>
        </label>`).join("");
}

/*19° - Agrego un eventListener a boton para renderize nuevamente las card cada vez que 
se preciona buscar*/
boton.addEventListener("click",()=>{
    /*Visualizo el array con los eventos por consola*/
    //console.log(inputBusqueda.value);
    renderSearch();
});

/*22° - Funcion que crea un array y devuelve el nombre de los checkboxes 
checkeados*/
function getChequeados(){
    //Creo un array que contendra los checkboxes con estado checked
    let chequeados = [];
    checkboxes.forEach(checkbox => {
        if(checkbox.checked){
            chequeados.push(checkbox.value);
        }
    });
    return chequeados;
};

/*23° - Funcion que realiza una busqueda segun el filtro que se encuentra 
activo*/
function renderSearch(){
    /*Creamos las funciones que contendran los valores tomados desde la web*/
    let textoBusqueda = inputBusqueda.value;
    let categoriasChequeados = getChequeados();
    mensaje.innerHTML="";
    
    /*Visualizo el array con los eventos por consola*/
    //console.log(textoBusqueda);
    //console.log(categoriasChequeados);
    
    /*Creo una variable para guardar los resultados obtenidos segun las
    selecciones realizadas*/
    let resultados = eventos.filter(evento => (evento.name.toLowerCase().includes(textoBusqueda.toLowerCase()))||(evento.description.toLowerCase().includes(textoBusqueda.toLowerCase())));
    /*Visualizo el array con los eventos por consola*/
    //console.log(resultados);
    if(categoriasChequeados.length>0){
        resultados = resultados.filter(evento =>{
            let pasaFiltro = false;
            if(categoriasChequeados.includes(evento.category)){
                pasaFiltro = true;
            }
            return pasaFiltro;
        });
        
    }
    renderCards(resultados)
    if(resultados.length==0){
        mensaje.innerHTML= `<h5>No se encontraron eventos disponibles</h5>`
    }
};




