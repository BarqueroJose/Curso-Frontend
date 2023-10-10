// Js para comprobacion de datos 



//Capturar el valor del inputNick
const nickInput = document.getElementById('nick');
console.log(nickInput.nodeType);
nickInput.value = "paco";
console.log(nickInput.value);

//Capturar el valor de select
const tamanoInput = document.getElementById('tamano');
console.log(tamanoInput.value);
//Con esto podemos extraer el texto de las demas opciones del comboBox (Extraer informacion de los demas OPTION)
console.log(tamanoInput.options[tamanoInput.selectedIndex].text);


//Ejemplo sobre eventos
function test(){
    console.log("Evento sobre raton")
}