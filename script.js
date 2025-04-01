const cartaWidth = 100; //ancho carta
const cartaHeight = 150; //alto carta
const espaciado = 20; //espacio entre cartas
let cartas = [];
let cartaSeleccionada = null;
let imagenesPokemon = [];
let score = 0;

function setup() {
    createCanvas(1230, 500);

    const numCartas = 10; //10 pares de cartas

    cargarImagenesPokemon(numCartas);

    //se duplica la carta par
    for (let i = 0; i < numCartas; i++) {
        
        let carta = {
            id: i + 1,//carta id unico
            width: cartaWidth,
            height: cartaHeight,
            imagen: null,
            descubierta: false,
            enable: true
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
        if (carta.descubierta) {
            image(carta.imagen, carta.x, carta.y, carta.width, carta.height);
        } else {
            fill(255, 178, 219);
            stroke(0); 
            stroke(255, 20, 147, 0.7 * 255); 
            strokeWeight(1);
            rect(carta.x, carta.y, carta.width, carta.height);
        }

        //sig fila para que no se duplique
        xPos += cartaWidth + espaciado;
        if (xPos + cartaWidth > width) {
            xPos = espaciado;
            yPos += cartaHeight + espaciado;
        }
    }

    //GANASTEIS
    if (score === 100) {
        fill(255, 20, 147);
        textSize(50);
        textAlign(CENTER, CENTER);
        text("🎉 GANASTE EL JUEGO 🎉", width / 2, 420);
    }
}

function barajeo(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; //se intercambian los elementos del aray y la ques
    }
}

async function cargarImagenesPokemon(numCartas) {
    //consulta api
    for (let i = 1; i <= numCartas; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        const spriteUrl = data.sprites.front_default;  //sprite

        imagenesPokemon.push(loadImage(spriteUrl));
    }

    //asigna img a cada carta pero basada en el id
    for (let i = 0; i < cartas.length; i++) {
        const imagenIndex = cartas[i].id - 1;  //indice id de la imagen
        cartas[i].imagen = imagenesPokemon[imagenIndex % numCartas]; 
    }
}

function actualizarPuntaje() {
    document.getElementById("score").innerText = `Score: ${score}`;
}
setInterval(actualizarPuntaje, 1000);

//la funcion para cuando se pica el mouse
function mousePressed() {
    for (let i = 0; i < cartas.length; i++) {
        let carta = cartas[i];

        if (!carta.enable || carta.descubierta) continue;
        
        if (mouseX > carta.x && mouseX < carta.x + carta.width && mouseY > carta.y && mouseY < carta.y + carta.height) {
            console.log("id de la carta clickeada: " + carta.id); 

            //verificar si las cartas son iguales
            if (cartaSeleccionada === null) {
                cartaSeleccionada = carta;  //se guarda la carta seleccionada
                carta.descubierta = true;
                
            } else {
                //si ya se ha seleccionada una carta compara con la nueva
                carta.descubierta = true;
                
                if (cartaSeleccionada.id === carta.id) {
                    console.log("si es la misma cartaaa!!!");
                    cartaSeleccionada.enable = false;
                    carta.enable = false;
                    score += 10;
                    console.log(score)
                }
                
                //timer
                if (cartaSeleccionada.id !== carta.id) {
                    setTimeout(() => {
                        cartaSeleccionada.descubierta = false;
                        carta.descubierta = false;
                        cartaSeleccionada = null;
                    }, 500);
                } else {
                    cartaSeleccionada = null;  //reinicia la bandera si es par correcto
                }
            }
        }


    }
}