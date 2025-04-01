const cartaWidth = 100; //ancho carta
const cartaHeight = 150; //alto carta
const espaciado = 20; //espacio entre cartas
let cartas = [];


function setup() {
    createCanvas(1230, 500);

    const numCartas = 10; //10 pares de cartas

    //se duplica la carta par
    for (let i = 0; i < numCartas; i++) {
        
        let carta = {
            id: i + 1,//carta id unico
            x: 0,  
            y: 0, 
            width: cartaWidth,
            height: cartaHeight
        };
        //añadir la carta por par
        cartas.push(carta);
        cartas.push(Object.assign({}, carta)); //copia del par, mismas propiedades pero no la misma direccion en memoria, otra referencia
    }

    barajeo(cartas);
}
  
  function draw() {
    background(255);

    //pos de cartas en el canbas
    let xPos = espaciado;
    let yPos = espaciado;

    for (let i = 0; i < cartas.length; i++) {
        let carta = cartas[i];

        //en el canva
        carta.x = xPos;
        carta.y = yPos;

        //dibuja la carta
        fill(255, 178, 219);
        stroke(0); 
        stroke(255, 20, 147, 0.7 * 255); 
        strokeWeight(1);
        rect(carta.x, carta.y, carta.width, carta.height);

        //sig fila para que no se duplique
        xPos += cartaWidth + espaciado;
        if (xPos + cartaWidth > width) {
            xPos = espaciado;
            yPos += cartaHeight + espaciado;
        }
    }
}

function barajeo(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; //se intercambian los elementos del aray y la ques
    }
}

//la funcion para cuando se pica el mouse
function mousePressed() {
    for (let i = 0; i < cartas.length; i++) {
        let carta = cartas[i];

        
        if (mouseX > carta.x && mouseX < carta.x + carta.width && mouseY > carta.y && mouseY < carta.y + carta.height) {
            console.log("id de la carta clickeada: " + carta.id); 
        }
    }
}