let htmlEvents = "";

for (let event of data.events)
{
    // Muestra todo los eventos
    htmlEvents += `<div class="card-body text-center">
    <img src="${event.image}" class="card_img card-img-top" alt="...">
    <h5 class="card-title mt-2 fw-bold ">${event.name}</h5>
    <p class="card-text">${event.description}</p>
    <div class="d-flex justify-content-between mt-5">
        <p>Price: $ ${event.price}
        <p>
            <button type="button" class="card_btn btn btn-outline-dark ">Ver mas</button>
    </div>
    </div>`;
}
console.log(htmlEvents);