const cartasRepartidas = document.querySelector("#cartasInicio");
const contenedorLog = document.querySelector("#contenedorLog");
const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const palos = ["corazon", "diamante", "trebol", "pica"];
let conjuntoCartas = [];

function crearCarta(cartaElegida, contenedor){
    let cartaBlanca = document.createElement("div");
    contenedor.appendChild(cartaBlanca);
    cartaBlanca.style.backgroundColor = "#FFFFFF";
    cartaBlanca.style.width = "55px";
    cartaBlanca.style.height = "100%";
    cartaBlanca.style.border = "solid 1px gray",
    cartaBlanca.style.borderRadius = "5px";
    cartaBlanca.style.marginLeft = "4px";
    cartaBlanca.style.display = "inline-block";
    cartaBlanca.style.fontSize = "20px";
    let simboloArriba = document.createElement("div");
    cartaBlanca.appendChild(simboloArriba);
    simboloArriba.style.marginLeft = "3px";
    let valor = document.createElement("div");
    cartaBlanca.appendChild(valor);
    valor.style.marginTop = "4px";
    valor.style.textAlign = "center";
    let simboloAbajo = document.createElement("div");
    cartaBlanca.appendChild(simboloAbajo);
    simboloAbajo.style.marginRight = "3px";
    simboloAbajo.style.marginTop = "11px";
    simboloAbajo.style.transform = "rotate(-180deg)";
    asignarColor(cartaElegida, simboloArriba, valor, simboloAbajo);
    asignarValor(cartaElegida, valor);
    asignarPalo(cartaElegida, simboloArriba, simboloAbajo);
}

function elegirCarta(arr1, arr2){
    let valoresCarta = [];
    valoresCarta.push(arr1[Math.floor(Math.random()*arr1.length)]);
    valoresCarta.push(arr2[Math.floor(Math.random()*arr2.length)]);
    return valoresCarta;
}

function asignarColor(arr, elem1, elem2, elem3){
    if(arr[1] === "corazon" || arr[1] === "diamante"){
        elem1.style.color = "red";
        elem2.style.color = "red";
        elem3.style.color = "red";
    }
}
function asignarPalo(arr, elem1, elem2){
    if(arr[1] === "corazon"){
        elem1.innerHTML = "♥";
        elem2.innerHTML = "♥";
    }
    else if(arr[1] === "diamante"){
        elem1.innerHTML = "♦";
        elem2.innerHTML = "♦";
    }
    else if(arr[1] === "trebol"){
        elem1.innerHTML = "♣";
        elem2.innerHTML = "♣";
    }
    else{
        elem1.innerHTML = "♠";
        elem2.innerHTML = "♠";
    }
}
function asignarValor(arr, elem){
    if(arr[0] >= 2 && arr[0]<= 10){
        elem.innerHTML = arr[0];
    }
    else if(arr[0] === 1){
        elem.innerHTML = "A";
    }
    else if(arr[0] === 11){
        elem.innerHTML = "J";
    }
    else if(arr[0] === 12){
        elem.innerHTML = "Q";
    }
    else{
        elem.innerHTML = "K";
    }
}

function limpiarTablero(contenedor){
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

function ordenarBurbuja(){
    let cartas = conjuntoCartas.slice();
    let wall = cartas.length - 1;
    let contadorIteracion = 0;
    while(wall > 0){
        for(let i=0; i< wall; i++){
            if(cartas[i][0] > cartas[i+1][0]){
                let cartaMayor = cartas[i];
                cartas[i] = cartas[i+1];
                cartas[i+1] = cartaMayor;
                //Creación de contenedor de cartas y cartas en pantalla// 
                let nuevoContenedor = document.createElement("div");
                contenedorLog.appendChild(nuevoContenedor);
                nuevoContenedor.style.height = "80px";
                nuevoContenedor.style.marginBottom = "10px";
                let contenedorNumero = document.createElement("div");
                contenedorNumero.style.float = "left";
                contenedorNumero.style.width = "20px";
                nuevoContenedor.appendChild(contenedorNumero);
                let numeroIteracion = document.createElement("span");
                numeroIteracion.innerHTML = contadorIteracion;
                contenedorNumero.appendChild(numeroIteracion);
                for(let j=0; j<cartas.length; j++){
                    crearCarta(cartas[j], nuevoContenedor);
                }
            contadorIteracion++;
            }
        }
        wall--;
    }
}
function ordenarSeleccion(){
    let cartas = conjuntoCartas.slice();
    let inicio = 0;
    let contadorIteracion = 0;
    while(inicio < cartas.length){
        for(let i = inicio+1; i<cartas.length; i++){
            if(cartas[inicio][0] > cartas[i][0]){
                let cartaMenor = cartas[i];
                cartas[i] = cartas[inicio];
                cartas[inicio] = cartaMenor;
                let nuevoContenedor = document.createElement("div");
                contenedorLog.appendChild(nuevoContenedor);
                nuevoContenedor.style.height = "80px";
                nuevoContenedor.style.marginBottom = "10px";
                let contenedorNumero = document.createElement("div");
                contenedorNumero.style.float = "left";
                contenedorNumero.style.width = "20px";
                nuevoContenedor.appendChild(contenedorNumero);
                let numeroIteracion = document.createElement("span");
                numeroIteracion.innerHTML = contadorIteracion;
                contenedorNumero.appendChild(numeroIteracion);
                for(let j=0; j<cartas.length; j++){
                    crearCarta(cartas[j], nuevoContenedor);
                }
            contadorIteracion++;   
            }
        }
        inicio++;
    }
}

//Boton crear carta ---> (Recibe un input con el numero de cartas)
document.querySelector("#botonRepartir").addEventListener("click", function(){
    conjuntoCartas = [];
    limpiarTablero(cartasRepartidas);
    limpiarTablero(contenedorLog);
    let input = document.querySelector("#nCartas");
    let numeroCartas = parseInt(input.value);
    for( let i=0; i<numeroCartas; i++){
        let cartaElegida = elegirCarta(valores, palos);
        conjuntoCartas.push(cartaElegida);
        crearCarta(cartaElegida, cartasRepartidas);
    }
});

//Boton de ordenar cartas tipo Burbuja-->}
document.querySelector("#botonBurbuja").addEventListener("click", function() {
    limpiarTablero(contenedorLog);
    ordenarBurbuja();
});

//Boton de ordenar cartas tipo Selección-->
document.querySelector("#botonSeleccion").addEventListener("click", function(){
    limpiarTablero(contenedorLog);
    ordenarSeleccion();
})