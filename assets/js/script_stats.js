/*Variables globales*/
/*1° - Guardamos la direccion de la API en una variable*/
let urlAPI = 'https://mindhub-xj03.onrender.com/api/amazing';

/*6° - Creo una variable tipo array vacio para guardar los datos de los eventos*/
let eventos = [];
let eventosPass = [];
let eventosUpcoming = [];

/*7° - Creo un variable para almacenar la fecha con la cual vamos a separar los 
eventos*/
let currentData;

/*8° - Creo una variable tipo array vacio para guardar las categorias de los
eventos*/
let categorias = [];
let categoriasPass =[];
let categoriasUpcoming = [];

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
        
        /*9° - Completo el array de eventos con todos los datos obtenidos del API*/
        for (let evento of dataAPI.events){
            eventos.push(evento);
        }

        /*10° - Asigno a la variable currentData la fecha indicada en DataApi*/
        currentData = new Date(dataAPI.currentDate);
        
        /*11° -  Completo el array de eventos posteriores y anteriores a la fecha 
        contenida en currentDate con los datos obtenidos del API*/
        for (let evento of dataAPI.events){
            let eventDate = new Date(evento.date);
            if(eventDate<currentData){
                eventosPass.push(evento);
            }else{
                eventosUpcoming.push(evento)
            }
        }

        /*Visualizo el array con los eventos por consola*/
        //console.log(eventos);
        //console.log(eventosPass);
        //console.log(eventosUpcoming)
        
        /*12° - Extraemos del array de eventos los tipos de eventos, usando una funcion*/
        categorias = extractCategory(eventos);
        categoriasPass = extractCategory(eventosPass);
        categoriasUpcoming = extractCategory(eventosUpcoming);

        /*Visualizo el array con los eventos por consola*/
        //console.log(categorias);
        //console.log(categoriasPass);
        //console.log(categoriasUpcoming)

        /*14 - Creamos un funcion para que cree los tr y los ubique en el body de la 
        primer tabla*/
        loadStatsUno(eventos,eventosPass);

        /*19° - Creamos un funcion para que cree los tr y los ubique en el body de la 
        segunda tabla*/
        loadStatsDos(eventosUpcoming,categoriasUpcoming);
        
        /*24° - Creamos un funcion para que cree los tr y los ubique en el body de la 
        segunda tabla*/
        loadStatsTres(eventosPass,categoriasPass);
        

    } catch (error) {
        console.log(error.message);
    }

}

/*5° - Llamo a la funcion para corroborar la conexion, los datos obtenidos y 
la funcionalidad de la logica*/
getEventos();

/*Funciones*/
/*13 - Creo una funcion que extrae los tipos de eventos del array obtenido de la API*/
function extractCategory(eventos){
    let category = [];
    eventos.forEach(evento =>{
        if(!category.includes(evento.category)){
            category.push(evento.category);
        }
    });
    //console.log(category);
    return category;
}

/*15° - Creamos una funcion que nos generar los tr y los ubica en el body de la tabla1*/
function loadStatsUno(eventos, eventosPass){
    let container = document.querySelector(".tableFirst");
    let tableBodyHTML = "";
    let mayorAsistencia = getMayorAsistencia(eventosPass);
    //console.log(mayorAsistencia);
    let menorAsistencia = getMenorAsistencia(eventosPass);
    //console.log(menorAsistencia);
    let mayorCapacidad = getMayorCapacidad(eventos);
    //console.log(mayorCapacidad);
    tableBodyHTML += `<tr>
        <td>${mayorAsistencia.name}<br>${(mayorAsistencia.assistance/
        mayorAsistencia.capacity*100).toFixed(2)} %</td>
        <td>${menorAsistencia.name}<br>${(menorAsistencia.assistance/
        menorAsistencia.capacity*100).toFixed(2)} %</td>
        <td>${mayorCapacidad.name}<br>${mayorCapacidad.capacity} Personas</td>
    </tr>`
    container.innerHTML = tableBodyHTML;
}

/*16° - Creamos una funcion que me devuelve el evento pasado con mayor porcentaje de 
asistencia*/
function getMayorAsistencia(eventosPass){
    return eventosPass.reduce((acumulador,valorActual)=>{
        if((valorActual.assistance/valorActual.capacity)>
        (acumulador.assistance/acumulador.capacity)){
            return valorActual;
        }else{
            return acumulador;
        };
    });
}

/*17° - Creamos una funcion que me devuelve el evento pasado con menor porcentaje de 
asistencia*/
function getMenorAsistencia(eventosPass){
    return eventosPass.reduce((acumulador,valorActual)=>{
        if((valorActual.assistance/valorActual.capacity)<
        (acumulador.assistance/acumulador.capacity)){
            return valorActual;
        }else{
            return acumulador;
        };
    });
}

/*18° - Creamos una funcion que me devuelve el evento con mayor capacidad*/
function getMayorCapacidad(eventos){
    return eventos.reduce((acumulador,valorActual)=>{
        if(valorActual.capacity>acumulador.capacity){
            return valorActual;
        }else{
            return acumulador;
        };
    });
}

/*20° - Creamos una funcion que nos genere los tr y los ubicque en el body de la tabla2*/
function loadStatsDos(eventosUpcoming,categoriasUpcoming){
    let container = document.querySelector(".tableSecond");
    let tableBodyHTML = "";
    categoriasUpcoming.forEach(categoria=>{
        let filtrarEventos = getEventosByCategory(categoria,eventosUpcoming);
        /*Visualizo los datos obtenidos por consola*/
        //console.log(categoria)
        //console.log(filtrarEventos)
        let gananciaCategoria = getGanancia(filtrarEventos,true);
        /*Visualizo los datos obtenidos por consola*/
        //console.log(gananciaCategoria)
        let porcentajeAsistencia = getPorcentajeAsistencia(filtrarEventos,true);
        /*Visualizo los datos obtenidos por consola*/
        //console.log(porcentajeAsistencia);
        tableBodyHTML += `<tr>
        <td>${categoria}</td>
        <td>$ ${gananciaCategoria}</td>
        <td>${Math.round(porcentajeAsistencia)} % </td>
    </tr>`

    });
    container.innerHTML = tableBodyHTML;
}

/*21° - Creamos un funcion que filtra los eventos por categoria*/
function getEventosByCategory(categoria,eventos){
    return eventos.filter(evento =>{
        if(evento.category.includes(categoria)){
            return true;
        }else{
            return false;
        }
    })
}
    
/*22° - Creamos un funcion que suma las ganacias de los eventos segun su categoria*/
function getGanancia(eventos,bandera){
    let sumaGanancias = 0;
    if(bandera){
        eventos.forEach(evento=>sumaGanancias += evento.price*evento.estimate);
    }else{
        eventos.forEach(evento=>sumaGanancias += evento.price*evento.assistance);
    }
    return sumaGanancias;
}

/*23° - Creamos un funcion que retorna el porcentaje de asistencia de los eventos segun su 
categoria*/
function getPorcentajeAsistencia(eventos,bandera){
    let sumaAsistencia = 0;
    let sumaCapacidad = 0;
    if(bandera){
        eventos.forEach(evento =>{
            sumaAsistencia += evento.estimate;
            sumaCapacidad += evento.capacity;
        });
    }else{
        eventos.forEach(evento =>{
            sumaAsistencia += evento.assistance;
            sumaCapacidad += evento.capacity;
        });
    }
    return sumaAsistencia/sumaCapacidad*100
}

/*25° - Creamos una funcion que nos genere los tr y los ubicque en el body de la tabla3*/
function loadStatsTres(eventosPass,categoriasPass){
    let container = document.querySelector(".tableThird");
    let tableBodyHTML = "";
    categoriasPass.forEach(categoria=>{
        let filtrarEventos = getEventosByCategory(categoria,eventosPass);
        /*Visualizo los datos obtenidos por consola*/
        //console.log(categoria)
        //console.log(filtrarEventos)
        let gananciaCategoria = getGanancia(filtrarEventos,false);
        /*Visualizo los datos obtenidos por consola*/
        //console.log(gananciaCategoria)
        let porcentajeAsistencia = getPorcentajeAsistencia(filtrarEventos,false);
        /*Visualizo los datos obtenidos por consola*/
        //console.log(porcentajeAsistencia);
        tableBodyHTML += `<tr>
        <td>${categoria}</td>
        <td>$ ${gananciaCategoria}</td>
        <td>${Math.round(porcentajeAsistencia)} % </td>
    </tr>`

    });
    container.innerHTML = tableBodyHTML;
}