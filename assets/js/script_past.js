let htmlEvents = "";

for (let event of data.events)
{
    //Muestra los pasados (Seria para pass)
    let currentDate = new Date(data.currentDate);
    let eventDate = new Date(event.date);
    if(eventDate<currentDate){
        htmlEvents += `<div class="col-sm-12 col-md-6 col-xl-3 py-2">
        <div class="card">
            <div class="card-body text-center">
                <img src="${event.image}" class="card_img card-img-top" alt="...">
                <h5 class="card-title mt-2 fw-bold ">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div class="d-flex justify-content-between mt-5">
                    <p>Price: $ ${event.price}
                    <p>
                    <a class="card_btn btn btn-outline-dark" href="./details.html" role="button">Ver mas</a>
                </div>
            </div>
        </div>
    </div>`;
    }
}

document.querySelector(".row").innerHTML=htmlEvents;

// console.log(htmlEvents)