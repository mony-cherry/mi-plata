


function obtenerUsuarios(){
return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios){
localStorage.setItem("usuarios", JSON.stringify(usuarios));
}





function registrarUsuario(){

let nombre = prompt("Ingrese nombre de usuario");

if(!nombre){
alert("El usuario no puede estar vacío");
return;
}

let clave = prompt("Ingrese su clave");
let repetirClave = prompt("Repita la clave");

if(clave !== repetirClave){
alert("Las claves no coinciden");
return;
}

let saldoInicial = Number(prompt("Ingrese saldo inicial"));

if(saldoInicial < 0){
alert("El saldo no puede ser negativo");
return;
}

let usuarios = obtenerUsuarios();

usuarios.push({
nombre:nombre,
clave:clave,
saldo:saldoInicial,
movimientos:[]
});

guardarUsuarios(usuarios);

alert("Usuario registrado correctamente");

}





function iniciarSesion(){

let usuarios = obtenerUsuarios();
let intentos = 3;

while(intentos > 0){

let nombre = prompt("Usuario");
let clave = prompt("Clave");

let usuario = usuarios.find(u => u.nombre === nombre && u.clave === clave);

if(usuario){

alert("Inicio de sesión exitoso");

menuTransacciones(usuario, usuarios);

guardarUsuarios(usuarios);

return;

}else{

intentos--;
alert("Datos incorrectos. Intentos restantes: " + intentos);

}

}

alert("Cuenta bloqueada por 24 horas, comunícate con tu banco");

}




function retirar(usuario){

let monto = Number(prompt("Monto a retirar"));

if(monto <= 0){
alert("Monto inválido");
return;
}

if(monto > usuario.saldo){
alert("Saldo insuficiente");
return;
}

usuario.saldo -= monto;

usuario.movimientos.push({
tipo:"Retiro",
monto:monto,
fecha:new Date().toLocaleString()
});

alert("Retiro exitoso. Nuevo saldo: $" + usuario.saldo);

}





function consignar(usuario){

let monto = Number(prompt("Monto a consignar"));

if(monto <= 0){
alert("Monto inválido");
return;
}

usuario.saldo += monto;

usuario.movimientos.push({
tipo:"Consignación",
monto:monto,
fecha:new Date().toLocaleString()
});

alert("Consignación exitosa. Nuevo saldo: $" + usuario.saldo);

}





function consultarSaldo(usuario){

alert("Tu saldo actual es: $" + usuario.saldo);

}





function consultarMovimientos(usuario){

if(usuario.movimientos.length === 0){
alert("No hay movimientos");
return;
}

let historial = "MOVIMIENTOS\n\n";

usuario.movimientos.forEach(m=>{
historial += m.fecha + " | " + m.tipo + " | $" + m.monto + "\n";
});

alert(historial);

}





function transferir(usuarioActual, usuarios){

let destinoNombre = prompt("Ingrese usuario destino");

let destino = usuarios.find(u => u.nombre === destinoNombre);

if(!destino){
alert("Usuario destino no existe");
return;
}

let monto = Number(prompt("Monto a transferir"));

if(monto <= 0){
alert("Monto inválido");
return;
}

if(monto > usuarioActual.saldo){
alert("Saldo insuficiente");
return;
}

usuarioActual.saldo -= monto;
destino.saldo += monto;

usuarioActual.movimientos.push({
tipo:"Transferencia enviada",
monto:monto,
fecha:new Date().toLocaleString()
});

destino.movimientos.push({
tipo:"Transferencia recibida",
monto:monto,
fecha:new Date().toLocaleString()
});

alert("Transferencia exitosa");

}


function menuTransacciones(usuario, usuarios){

let opcion;

do{

opcion = prompt(
"MI PLATA\n\n"+
"1 Retirar\n"+
"2 Consultar saldo\n"+
"3 Consignar\n"+
"4 Consultar movimientos\n"+
"5 Transferir\n"+
"6 Salir"
);

switch(opcion){

case "1":
retirar(usuario);
break;

case "2":
consultarSaldo(usuario);
break;

case "3":
consignar(usuario);
break;

case "4":
consultarMovimientos(usuario);
break;

case "5":
transferir(usuario, usuarios);
break;

case "6":
alert("Gracias por usar Mi Plata");
break;

default:
alert("Opción inválida");

}

}while(opcion !== "6");

}




function menuPrincipal(){

let opcion = prompt(
"MI PLATA\n\n"+
"1 Iniciar\n"+
"2 Registrar"
);

if(opcion === "1"){
iniciarSesion();
}

else if(opcion === "2"){
registrarUsuario();
}

else{
alert("Opción inválida");
}

}

menuPrincipal();