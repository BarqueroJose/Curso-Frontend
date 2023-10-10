/*
js para la gestion de datos del usuario
*/
let nick;
let email;
let tamano;
let geolocalizacionTxt;
let avatarImg;


//Guardando el Nick del usuario
function datosUsuarios(nick,tamano,email,avatarCont){

    //El sessionStorage Almacena datos solo para una sesión, 
    //lo que significa que los datos se almacenan hasta que se cierra el navegador (o la pestaña).
    sessionStorage.setItem('nick',nick.value);
    sessionStorage.setItem('email',email.value);
    sessionStorage.setItem('tamano',tamano.value);
    sessionStorage.setItem('geolocalizacionTxt',geolocalizacionTxt);
    sessionStorage.setItem('avatarImg',avatarCont.src);
    //LocalStorage Almacena datos sin fecha de caducidad y se borra solo a través de JavaScript o borrando 
    //la memoria caché del navegador/datos almacenados localmente.
   // localStorage.setItem('nick',nick.value);
}
//Las 2 se programan iguales pero su funcion es levemente distinta 

function getDatosUsuario(){

    nick = sessionStorage.getItem('nick');
    email = sessionStorage.getItem('email');
    tamano= sessionStorage.getItem('tamano');
    avatarImg = sessionStorage.getItem('avatarImg');

   // let nickLocal = localStorage.getItem('nick');
    //console.log(nick);
}
//Comprobacion de los datos desde la secion
function comprobacionDatosUsuario(){
  if(nick==null){
    sessionStorage.setItem('error','No se ha rellenado correctamente el formulario');
    return false;
  }
  return true;

}
//Geolocalizacion
function datoGeolocalizacion(){
    if(!navigator.geolocation){
      geolocalizacionTxt = "El navegador no es compatible con Api Geolocation";
    }else{
      navigator.geolocation.getCurrentPosition(
        //Exito
        (position)=>{geolocalizacionTxt= 'Latitud:' + position.coords.latitude+ ',Longitud:' + position.coords.longitude},
        //Error
        ()=>{geolocalizacionTxt = "La geolocalizacion no se ha podido realizar";}
      )
    }

}
//Local Storage 
function historicoUsuarios(nick){
  let historicoStorage = localStorage.getItem('Historico');
  let historico;
  if(historicoStorage == null){
     historico = [];
  }else{
    historico = JSON.parse(historicoStorage);
  }
  let registroUsuario = {
    usuario:nick.value,
    fecha:Date.now()
  }
  
  historico.push(registroUsuario);
localStorage.setItem('Historico',JSON.stringify(historico));
}


