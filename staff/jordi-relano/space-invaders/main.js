let ship = document.getElementById("ship");
let alien = document.getElementById("aliens");

let x = 40;
let y = 78;

ship.style.left = x + "vw";
ship.style.top = y + "vh";


document.onkeydown = function (event) {
    if (event.key === "ArrowLeft" && x > 0)
        x = x - 1;
    else if (event.key === "ArrowRight" && x < 90)
        x = x + 1;

    if (event.key === "ArrowUp" && y > 0)
        y = y - 1;
    else if (event.key === "ArrowDown" && y < 78)
        y = y + 1;

    let shipReact = ship.getBoundingClientRect();
    let alienReact = alien.getBoundingClientRect();

    console.log(shipReact, alienReact)

    ship.style.left = x + "vw";
    ship.style.top = y + "vh";



};
// domRect = element.getBoundingClientRect();  propiedad para sacar coordenadas de un elemento





