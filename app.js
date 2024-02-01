//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Juego del número secreto';

//let parrafo = document.querySelector('p');
//parrafo.innerHTML = 'Indica un número del 1 al 10';

let numeroSecreto = 0;
let intentos = 0;
let listaNumeroSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}:`);  
    numeroSecreto = generarNumeroSecreto();     // Generar número secreto 
    intentos = 1;   // Reiniciar contador de intentos
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos > 1) ? 'intentos': 'intento' }` );
        document.getElementById('reiniciar').removeAttribute('disabled'); //Activar botón Nuevo juego solo si ganas el juego
    } else {
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }

        intentos++;
        limpiarCaja();  // Limpiar cuadro de texto
    }
    return;
}

function limpiarCaja() {
   document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumeroSorteados);

       //Si ya sorteamos todos los números
    if (listaNumeroSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles')
    } else {
        // Si el número generado está incluido en la lista
        if (listaNumeroSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumeroSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function reiniciarJuego() {
    // Limpiar la caja
    limpiarCaja();

    // Regresar a condiciones iniciales
    condicionesIniciales();
    
    // Deshabilitar botón de Nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled',true);
    
}

condicionesIniciales();
