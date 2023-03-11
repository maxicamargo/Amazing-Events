//Funciones
//Cargar categorias
function crearHtmlCategoria(array){
    /*Cargando las categorias de forma dinamica*/
    /*Creamos el HTML*/
    let htmlCategorias = "";
    array.forEach(elemento=>htmlCategorias+=`<div class="main_form_izq p-3">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="${elemento.toLowerCase()}" id="${elemento.toLowerCase()}" value="${elemento.toLowerCase()}">
            <label class="form-check-label" for="flexCheckDefault">
            ${elemento}
            </label>
        </div>
    </div>`);
    //console.log(htmlCategorias);
    return htmlCategorias;
};

function crearHtmlEventos(array){
    /*Cargamos las tarjetas de forma dinamica*/
    /*Creamos el HTML*/
    let htmlEventos = "";
    array.forEach(elemento=>htmlEventos += `<div class="col-sm-12 col-md-6 col-xl-3 py-2">
        <div class="card">
            <div class="card-body text-center">
                <img src="${elemento.image}" class="card_img card-img-top" alt="...">
                <h5 class="card-title mt-2 fw-bold ">${elemento.name}</h5>
                <p class="card-text">${elemento.description}</p>
                <div class="d-flex justify-content-between mt-5">
                    <p>Price: $ ${elemento.price}
                    <p>
                    <a class="card_btn btn btn-outline-dark" href="./details.html" role="button">Ver mas</a>
                </div>
            </div>
        </div>
    </div>`);
    //console.log(htmlEventos);
    return htmlEventos;
}

//Datos: Creo los array con los que voy a trabajar
// Array con todos los eventos
let arrayEventos = [];
for(let evento of data.events){
    arrayEventos.push(evento)
}
//console.log(arrayEventos)

//Array con todas las categorias
let arrayCategorias = []
for(let evento of arrayEventos){
    if(!arrayCategorias.includes(evento.category)){
        arrayCategorias.push(evento.category);
    }
} 
//console.log(arrayCategorias)


/*Agreagamos el HTML de categorias*/
document.querySelector(".main_form_izq").innerHTML=crearHtmlCategoria(arrayCategorias);

/*Agreagamos el HTML*/
document.querySelector(".row").innerHTML=crearHtmlEventos(arrayEventos);


/*Configurando los filtros*/
//let checkbox = document.querySelector("input[type=checkbox]")
//console.log(checkbox.value)
//checkbox.addEventListener("change",()=>{
    //if(checkbox.checked){
        //console.log(checkbox.value+" - Seleccionado")
    //}else{
        //console.log(checkbox.value+" - No seleccionado")
    //}
//})

let checkbox2 = document.querySelectorAll("input[type=checkbox]")
let arrayCheckbox = []
//console.log(checkbox2)



checkbox2.forEach(input=>{
    input.addEventListener("change",()=>{
        if(input.checked){
            //console.log(input.value+" - Seleccionado")
            //console.log(input)
            arrayCheckbox.push(input.value);
        }else{
            //console.log(input.value+" - No seleccionado")
            arrayCheckbox = arrayCheckbox.filter(item=>item!=input.value);
        }
        console.log(arrayCheckbox);
        //console.log(arrayCheckbox2);

        if(arrayCheckbox.length!=0){
            arrayCheckbox.forEach(element => {
                console.log(element)
            });



            console.log("Hay seleccion")
            eventosCheckbox = arrayEventos.filter(item=>item.category!=input.value);
            console.log(eventosCheckbox)
            /*Agreagamos el HTML*/
            document.querySelector(".row").innerHTML=crearHtmlEventos(eventosCheckbox);
        }
    });
    
})



