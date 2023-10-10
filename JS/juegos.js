/*
Js para el juego 
*/

//Variables globales
let iniciadorMarcado = false;
let adyacentes = [];
let idMarcados = [];
let classMarcada;
let tamanoPanel;
let idInterval ;

//Color de manera aleatoria
function getRandomInt(max){
    return Math.floor(Math.random()*max);
}

//rellenar formulario
function rellenarFormularioUsuario(){
    document.getElementById("nick").value = nick;
    document.getElementById("avatarImg").src=avatarImg;
    //Convirtiendo la variable tamano a int 
    tamanoPanel =  parseInt(tamano);
}

function pintarPanelJuego(){
    document.getElementById("juego").style.gridTemplateColumns = "repeat("+tamano+",1fr)";
    document.getElementById("juego").style.gridTemplateRows ="repeat("+tamano+",1fr)";
    //Pintando los elementos de forma Automatica
    let items = "";
    //cambiando el color
    let color = ["rojo","verde"];
    let colorRnd = 0;
    for (let index = 0; index < parseInt(tamano)*parseInt(tamano); index++) {
        
        //cambiando el color de manera aleatoria 
    //(con el if damos a entender que en los pares se va a cambiar el color y en los inpares no ) para asi haces el juego mas comodo 
        if(index%2>0) colorRnd = getRandomInt(2);
        //Agregando los circulos (contenedores) de manera automatica
        items+=`<div class="containerItem"><div id="${index}"class="item ${color[colorRnd]}"></div></div>` ; 
    }
    //El innerTHML devuelve o establece la sintaxis HTML describiendo los descendientes del elemento.
    document.getElementById("juego").innerHTML = items;
    
}
//calcular el array de los adyacentes
function calcularAdyacentes(idMarcado){
    adyacentes = [];
    //adyacente superior
    if((idMarcado-tamano)>=0)adyacentes.push(idMarcado-tamano);

    //adyacente inferior
    if((idMarcado+tamano)<(tamanoPanel*tamanoPanel))adyacentes.push(idMarcado+tamano);
    
    //adyacente izquierda
    if((idMarcado%tamanoPanel)>0) adyacentes.push(idMarcado-1);

    //adyacente derecho
    if(((idMarcado+1)%tamanoPanel)>0)adyacentes.push(idMarcado+1);

    for (let index = 0; index < adyacentes.length; index++) {
        console.log(adyacentes[index]);
        
    }
}
//Conteo del tiempo restate
function cuentaAtras(){
let tiempoRestante = parseInt(document.getElementById("tmpo").value)-1;
document.getElementById("tmpo").value = tiempoRestante;
if(tiempoRestante == 0){
    clearInterval(idInterval);
    //Finalizar todos los eventos al llegar el tiempo a 0 
    const items = document.getElementsByClassName('item');
    for(let item of items){
        item.removeEventListener('mousedown',comenzarMarcar);
        //Seguir marcando
        item.removeEventListener('mouseover',continuarMarcando);
        
    }
    document.removeEventListener('mouseup',finalizarMarcado);
    //Camboar z index de los paneles 
    document.getElementById('juegoAcabado').classList.add('juegoAcabadoColor');
    document.getElementById('juegoAcabado').style.zIndex=2;
    document.getElementById('juego').style.zIndex=1;
    document.getElementById('nuevaPartida').addEventListener("click",(e)=>location.reload());

}

}

//Eventos del juego 

function programarEventoJuego(){
  //mousedown el evento se activa Element cuando se presiona el botón de un dispositivo señalador mientras el puntero está dentro del elemento.
    const items = document.getElementsByClassName('item');
    for(let item of items){
        item.addEventListener('mousedown',comenzarMarcar);
        //Seguir marcando
        item.addEventListener('mouseover',continuarMarcando);
        
    }
    //Para el mouse 
    document.addEventListener('mouseup',finalizarMarcado);
    //Cuenta atras
    idInterval = setInterval(cuentaAtras,1000);

}

//Funciones del juego
function comenzarMarcar(event){
    //Iniciar el marcado de los circulos

    //Aqui vamos a cambiar el color de fondo
    let item = event.target;
    let containerItem = event.target.parentElement;
    if (item.classList.contains('rojo')) {
        classMarcada = 'rojo';
        containerItem.classList.add('rojo');
    }else{
        classMarcada = 'verde';
        containerItem.classList.add('verde');
    }
    //Esto nos sirve para cuando pasemos el mouse no se marque las casillas
    //Sino cuando nosotros hagamos click sobre una casilla comience el marcador
    if(!iniciadorMarcado){
        iniciadorMarcado = true;
    }
    //Guardar los marcadis
    idMarcados.push(parseInt(item.id));
    //Comienzo a calcular los adyacentes
    calcularAdyacentes(parseInt(item.id));
    console.log("Pinchado sobre un circulo");

}
//Continua el marcado
function continuarMarcando(event){
    if(iniciadorMarcado){
    let item = event.target;
    let idNuevo = parseInt(item.id);
    //Es adyacente ?
    if(adyacentes.includes(idNuevo)&&event.target.classList.contains(classMarcada)){
    let containerItem = event.target.parentElement;
    if (item.classList.contains('rojo')) {
        containerItem.classList.add('rojo');
    }else{
        containerItem.classList.add('verde');
    }
    idMarcados.push(parseInt(item.id));
    calcularAdyacentes(parseInt(item.id));
}
    }
    console.log("Pasando sobre un circulo");
}
//Finalizar el marcado
function finalizarMarcado(event){
    iniciadorMarcado = false;
    adyacentes =[];
    //Marcador 
    const puntuacionInput = document.getElementById("puntuacion");
    if(idMarcados.length>1){
        puntuacionInput.value = parseInt(puntuacionInput.value)+idMarcados.length;
    }
    //Trabajar con los marcados
    for (let index = 0; index < idMarcados.length; index++) {
        //Capturando el objeto
        let itemMarcado = document.getElementById(idMarcados[index]);
        itemMarcado.parentElement.classList.remove(classMarcada);
        //Cambiar el color de los objetos de forma ranbom
        let color = ['rojo','verde']
        let colorRnd = getRandomInt(2);
        itemMarcado.classList.remove(classMarcada);
        itemMarcado.classList.add(color[colorRnd]);
    }
    idMarcados = [];
    console.log("Finalizar el marcado");
}

//capturamos los datos del usuario
getDatosUsuario();
//comprobacion del usuario

if(!comprobacionDatosUsuario()){
 location = "index.html";
 
}

//rellenamos el formulario
rellenarFormularioUsuario();
pintarPanelJuego();
programarEventoJuego();

