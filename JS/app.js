/* 
JS para la comprobacion de datos del formuario de entrada
*/

//Inicializacion de varaibls y objetos, Doom

//Estos son los id de Nick (txtbox) y tamano (comboBox)
let nickInput;
let tamanoInput;
let emailInput;
//Formulario 
let formEntrada;
let error;
//Evento drag and drop
let avatarIteams;
let iteamImg;
let avatarCont;

//Funciones de evento
function comprobarForm(event){
    //Comprobar cambios    Para comprobar que no haya numero en el String
    if (nickInput.value.match(/(?<!\S)[0-9]/)) {
        nickInput.focus();
        event.preventDefault();
        error.innerText="El campo nick no puede comenzar con un numero";
        return false;
    } 
    //Como los valores son String (Aunque sean numeros) necesitamos que el 0 tambien sea String 
    else if(tamanoInput.value=="0"){
        tamanoInput.focus();
        event.preventDefault();
        error.innerText="Se debe Seleccionar un tamano de panel";
        return false;
    }
    //La informacion es correcta
    //Lo que estamos haciendo aqui es otorgando la info de nickInput al datosUsuarios.js
    datosUsuarios(nickInput,tamanoInput,emailInput,avatarCont);
    historicoUsuarios(nickInput);
    return true;
}

function moviendoImg(event){
    //Funcion para saber cual de los 6 estamos moviendo
    iteamImg = event.target;
    console.log(iteamImg.src);
}
function cambiarImg(event){
    //Cambiar avatar en el container
    avatarCont.src = iteamImg.src;
}
//Carga de objetos del Doom por completo al entrar en la pagina (comprobaciones y eventos del formulario)
function doomCargado(){
    //Capturar todos los elementos necesarios
     nickInput=document.getElementById("nick");
     tamanoInput=document.getElementById("tamano");
     emailInput = document.getElementById('email');
    //Formulario 
     formEntrada=document.getElementById("formEntrada");
     error = document.getElementById("error");
    
     //Comprobar si hay algun error de juego.html (Se mete aqui a dentro para verificar que no hay errores cuando el doom cargue)
    if(sessionStorage.getItem('error')!=null){
    error.innerText = sessionStorage.getItem('error');
    //Borramos el error 
    sessionStorage.removeItem('error');
  }
  //Inicio de carga de Eventos
  formEntrada.addEventListener('submit',comprobarForm);

  //Eventos del Drag And Drop
  avatarIteams = document.getElementsByClassName("avatarImgItem"); 

  for(let iteam of avatarIteams){
    //Como son varios lo tenemos que recorrer todos
    iteam.addEventListener('dragstart',moviendoImg)
  }
  //Para cambiar el avatar en el container
  avatarCont = document.getElementById("avatarImg");
  avatarCont.addEventListener('dragover',e=>{e.preventDefault()});
  avatarCont.addEventListener('drop',cambiarImg);
}

//Inicio de carga de Eventos
document.addEventListener('DOMContentLoaded',doomCargado);
//geolocalizacon
datoGeolocalizacion();

