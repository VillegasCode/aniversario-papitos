//Creating variables to save the value of the tales
let tarjetaUNO = null;
let tarjeta2 = null;
let tarjetasDestapadas = 0;

//Creating variables to compare first result of a tale with second result fo a tale
let primerResultado = null;
let segundoResultado = null;

//Pointing to html document to its IDs with quatotion marks
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");
let ocultarBoton = document.getElementById("reiniciar").style.visibility = 'hidden';
let tiempoJuntos = document.getElementById("tiempoAtuLado");
let estadoDelJuego = document.getElementById("statusOFgame");


//Creating variables to count time
let timer = 35;
let temporizador = false;
let tiempoRegresivoId = null;

//Creating variables to ACIERTOS and MOVIMIENTOS
let aciertos = 0;
let movimientos = 0;

//Sounds to the Eva Memory Game
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//Create un array with duplicate numbers of total of tales
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

//We generate random numbers with arrow function
numeros = numeros.sort(()=>{return Math.random()-0.5});
//Write in console the numeros array of random way
console.log(numeros);

//Creating variables of date for compare
let fecha = new Date()
let anio_actual = fecha.getUTCFullYear();
let mes_actual = fecha.getMonth() + 1;
let dia_actual = fecha.getDate();
let fecha_aniversario = new Date("1990/01/20");
let hoy = new Date(mes_actual + "/" + dia_actual + "/" + anio_actual);

let diferenciaTiempo = hoy.getFullYear() - fecha_aniversario.getFullYear();
    let mes = mes_actual - parseInt(fecha_aniversario.getMonth() + 1);
    let dia = dia_actual - fecha_aniversario.getDate();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha_aniversario.getDate())){
        diferenciaTiempo--;
        mes = 12 + mes;
    }
    tiempoJuntos.innerHTML = `${diferenciaTiempo} años con ${mes} meses y ${dia} días juntos😍, ningún día es fácil pero un amor tan bonito lo puede todo 👫‍<br>¡LOS AMO!`;

//Function to count time
function contarTiempo() {
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
            estadoDelJuego.innerHTML = `Feliz Aniversario Papitos❤️, no todo sale perfecto,🤗solo hay que volver a intentarlo 😘`;
        }
    },1000);
}


//Function para CAMBIAR CSS cuando timer == 0 o se bloqueen las tarjetas
function cambiarPerderCSS(){
    //Cambiamos la hoja de estilo css cada vez que pierden o ganen porque el tiempo se acabó
    var styles = 'perder.css';
    var newSS=document.createElement('link');
    newSS.rel='stylesheet';
    newSS.type='text/css';
    newSS.href= styles;
    document.getElementsByTagName("head")[0].appendChild(newSS);
}

function cambiarGanarCSS(){
    //Cambiamos la hoja de estilo css cada vez que pierden o ganen porque el tiempo se acabó
    var styles = 'ganar.css';
    var newSS=document.createElement('link');
    newSS.rel='stylesheet';
    newSS.type='text/css';
    newSS.href= styles;
    document.getElementsByTagName("head")[0].appendChild(newSS);
}

//Function bloquearTarjetas
function bloquearTarjetas() {
    for (let i=0; i<=19; i++) {
        //Obtenemos el objeto del index.html
        let tarjetaBloqueada = document.getElementById(i);
        //Al objeto le cambiamos su estado para que muestre la figura
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png">`;
        //Bloqueamos o deshabilitamos la tarjeta
        tarjetaBloqueada.disabled = true;
    }
    cambiarPerderCSS();
    //Obtenemos el botón llamado "reiniciar" y lo volvemos visible cada vez que las tarjetas se bloqueen
    let mostrarBoton = document.getElementById("reiniciar").style.visibility = 'visible';
}

//We create a MAIN FUNCTION named "destapar" TO SHOW THE TILES
function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //Play the 1st audio to begin
        clickAudio.play();
        //Show first number id
        tarjetaUNO = document.getElementById(id);
        //First button pressed id captures
        primerResultado = numeros[id];
        
        tarjetaUNO.innerHTML = `<img src="./images/${primerResultado}.png">`;

        //Disabling the first button pressed
        tarjetaUNO.disabled = true;
        if (timer == 0) {
            //Lock tiles calling the function "bloquearTarjetas"
            bloquearTarjetas();
        }
    } else if (tarjetasDestapadas == 2) {
        //Show second number
        tarjeta2 = document.getElementById(id);
        //If second button is pressed then id is captured
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png">`;

        //Disabling second button
        tarjeta2.disabled = true;
        //If time is over then call to bloquearTarjetas function
        if (timer == 0) {
            bloquearTarjetas();
        }
        //Increase movements
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    
        //Compare primerResultado with segundoResultado are match
        if (primerResultado == segundoResultado) {
            //Reset counter of tarjetasDestapadas
            tarjetasDestapadas = 0;
            rightAudio.play();
            //10+ like bonus
            timer = timer + 10;
            //Increase hits
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👏`;
            if (aciertos == 10){
                //Stop the counter
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 👏`;
                mostrarTiempo.innerHTML = `¡GANARON! ⏰ SOBRÓ ${timer} segundos<BR>porque un logro mío es un logro tuyo mi amor`;
                estadoDelJuego.innerHTML = `Feliz Aniversario Papitos❤️🥳¡GANARON!<br>Ustedes lo pueden todo 😘`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎`;
                //Play to audio when myself won
                winAudio.play();
                cambiarGanarCSS();
                mostrarBoton = document.getElementById('reiniciar').style.visibility = 'visible';
            }
        } else {
            //If primerResultado is diferent to segundoResultado then show for a moment their values and come back to hidden
        setTimeout(()=>{
            //Come back to their status enabled 'cause they are diferent
            tarjetaUNO.disabled = false;
            tarjeta2.disabled = false;
            
            //Come back to show their cover cause are diferent
            tarjetaUNO.innerHTML = `<img class="portada" src="./images/cover.png">`;
            tarjeta2.innerHTML = `<img class="portada" src="./images/cover.png">`;
            console.log(tarjetaUNO);
            console.log(tarjeta2);
            
            //Come back tarjetasDestapadas to CERO
            tarjetasDestapadas = 0;
            //Play audio of wrong
            wrongAudio.play();
            //If timer is CERO then call to bloquearTarjetas function
            if (timer == 0) {
                bloquearTarjetas();
            }
        }, 1100);
        
    }
}
}