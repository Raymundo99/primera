window.onload=function() {
btnRegistrar=document.getElementById("btnRegistrar");
    ingreso=document.getElementById("ingreso");
    registro=document.getElementById("registro");
    txtCorreo=document.getElementById("correoR");
    btnRegistro=document.getElementById("btnRegistro");
    txtNombre=document.getElementById("nombreR");
    txtContrasena=document.getElementById("contrasenaR");
    txtConfirmacion=document.getElementById("confirmacionR");
    txtFecha=document.getElementById("fechaR");
    btnIngresar=document.getElementById("btnIngresar");
    txtCorreoI=document.getElementById("correo");
    txtContrasenaI=document.getElementById("contrasena");
    btnenviarM=document.getElementById("enviarM");
    txtCorreoM=document.getElementById("correoM");
    txtMensajeM=document.getElementById("mensajeM");
    nombreP=document.getElementById("nombreP");
    redactar=document.getElementById("redactar");
    camera=document.getElementById("camera");
    photo=document.getElementById("photo");
    mapa=document.getElementById("mapa");

    if(localStorage.getItem("login") !=="1"){
        ingreso.style.display="block";
        principal.style.display="none";
        redactar.style.display="none";
        document.getElementById("camara").style.display="none";
    }
    else{
        ingreso.style.display="none";
        principal.style.display="block";
        redactar.style.display="block";
        nombre=localStorage.getItem("nombre");
        correo=localStorage.getItem("correo");
        document.getElementById("nombreP").innerHTML=nombre;
        leerM();
    }
}

document.getElementById("enviarM").addEventListener("click", function(){
    if(txtCorreoM.value==""){
        alert("Debe escribir para quien es");
        txtCorreoM.classList.add("errorCampo");//Agregar un estilo
        return false;
    }
    else{
        txtCorreoM.classList.remove("errorCampo");//Quitar el estilo
    }

    if(txtMensajeM.value==""){
        alert("Debe escribir el mensaje");
        txtMensajeM.classList.add("errorCampo");
        return false;
    }
    else{
        txtMensajeM.classList.remove("errorCampo");
    }

    let datosM = new FormData();
        datosM.append("correoM", txtCorreoM.value);
        datosM.append("mensajeM", txtMensajeM.value);
    
        fetch("http://tparrv.6te.net/guardarMensaje.php", {
            method: 'POST',
            body: datosM
        })
        .then(function(response){
            if(response.ok){
                alert("MENSAJE REGISTRADO");
            }
            else{
                alert("OCURRIO UN ERROR AL REGISTRAR");
                console.log(response);
            }
        })
        .catch(function(err){
            alert("OCURRIO UN ERROR ->" + err);
        });
});

btnRegistrar.addEventListener("click", function() {
    ingreso.style.display="none";
    registro.style.display="block";
});

btnRegistro.addEventListener("click", function(){
if(txtCorreo.value==""){
    alert("Debe escribir correo");
    txtCorreo.classList.add("errorCampo");//Agregar un estilo
    return false;
}
else{
    txtCorreo.classList.remove("errorCampo");//Quitar el estilo
}
if(txtNombre.value==""){
    alert("Debe escribir nombre");
    txtNombre.classList.add("errorCampo");
    return false;
}
else{
    txtNombre.classList.remove("errorCampo");
}
if(txtContrasena.value==""){
    alert("Debe escribir contraseña");
    txtContrasena.classList.add("errorCampo");
    return false;
}
else{
    txtContrasena.classList.remove("errorCampo");
}
if(txtConfirmacion.value==""){
    alert("Debe escribir confirmacion");
    txtConfirmacion.classList.add("errorCampo");
    return false;
}
else{
    txtConfirmacion.classList.remove("errorCampo");
}
if(txtFecha.value==""){
    alert("Debe escribir fecha");
    txtFecha.classList.add("errorCampo");
    return false;
}
else{
    txtFecha.classList.remove("errorCampo");
}

if(txtContrasena.value!=txtConfirmacion.value){
    alert("Deben ser iguales la contrasena y la confirmacion");
    txtConfirmacion.classList.add("errorCampo");
    txtContrasena.classList.add("errorCampo");
    return false;
}
else{
    txtConfirmacion.classList.remove("errorCampo");
    txtContrasena.classList.remove("errorCampo");
}
let datos = new FormData();
    datos.append("correoR", txtCorreo.value);
    datos.append("nombreR", txtNombre.value);
    datos.append("contrasenaR", txtContrasena.value);
    datos.append("fechaR", txtFecha.value);

    fetch("http://tparrv.6te.net/registro.php", {
        method: 'POST',
        body: datos
    })
    .then(function(response){
        if(response.ok){
            alert("USUARIO REGISTRADO");
            ingreso.style.display="block";
            registro.style.display="none";
        }
        else{
            alert("OCURRIO UN ERROR AL REGISTRAR");
            console.log(response);
        }
    })
    .catch(function(err){
        alert("OCURRIO UN ERROR ->" + err);
    });
});

btnIngresar.addEventListener("click", function(){
    if(txtCorreoI.value==""){
        alert("Debe escribir correo");
        txtCorreoI.classList.add("errorCampo");//Agregar un estilo
        return false;
    }
    else{
        txtCorreoI.classList.add("errorCampo");
    }
    if(txtContrasenaI.value==""){
        alert("Debe escribir contraseña");
        txtContrasenaI.classList.add("errorCampo");
        return false;
    }
    else{
        txtContrasenaI.classList.remove("errorCampo");
    }
let datosI=new FormData();
datosI.append("correoI", txtCorreoI.value);
datosI.append("contrasenaI", txtContrasenaI.value);

fetch("http://tparrv.6te.net/ingreso.php", {
method: 'POST',
body: datosI
})
.then(function(response) {
    return response.json();
})
.then(function(data){
if(data.fallo=="contrasena"){
    alert("Debe escribir la contraseña correcta");
    txtContrasenaI.classList.add("errorCampo");
    return false;
}
if(data.fallo=="usuario"){
    alert("El correo no esta registrado");
}
else{
    nombre=data.nombre;
    correo=data.correo;
    ingreso.style.display="none";
    principal.style.display="block";
    nombreP.innerHTML=nombre;
    localStorage.setItem("login", 1);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
    leerM();
}
})
.catch(function(err){
alert("Ocurrio un error inesperado");
console.log(err);
   });
});

function abrirBarra(){
    document.getElementById("barraMenu").style.width="250px";
}

function cerrarBarra(){
    document.getElementById("barraMenu").style.width="0";
}

function leerM() {
    let datosLM=new FormData();
    datosLM.append("correoUsuario", correo);
    fetch("http://tparrv.6te.net/leerMensajes.php", {
        method: 'POST',
        body: datosLM
    })
    .then(function(response){
    return response.json();
    })
    .then(function(data){
    for(let x=0; x<data.length; x++){
        document.getElementById("mensajes").innerHTML=
        document.getElementById("mensajes").innerHTML+data[x].mensaje+"<br>"+
        data[x].fechahora+"<br>";
    }
    });
}

function tomarFoto(){
    document.getElementById("redactar").style.display="none";
    document.getElementById("mensajes").style.display="none";
    document.getElementById("camara").style.display="block";
    cerrarBarra();
}

function mensajes(){
    redactar.style.display="block";
    document.getElementById("mensajes").style.display="block";
    document.getElementById("camara").style.display="none";
    cerrarBarra();
}

document.getElementById("btnOpen").addEventListener("click", function(){
    camera.click();
});

document.getElementById("camera").addEventListener("change", function(e){
    ruta=URL.createObjectURL(e.target.files[0]);
    obtenerLugar();
    photo.src=ruta;
    if(obtenerSO()=="iOS"){
     let link=document.createElement('a');
     link.download="test.png";
     link.href=ruta;
     link.click();
     alert("Foto capturada");
    }
    
    //link.href=photo.toDataURL("image/png").replace("image/png", "image/octet-stream");
});

function cerrarSesion(){
    cerrarBarra();
    localStorage.removeItem("nombre");
    localStorage.removeItem("correo");
    localStorage.setItem("login", 0);
    redactar.style.display="none";
    document.getElementById("principal").style.display="none";
    document.getElementById("mensajes").style.display="none";
    document.getElementById("camara").style.display="none";
    document.getElementById("ingreso").style.display="block";
}

function obtenerSO(){
    let so=null;
    let platform=window.navigator.platform,
        iosPlatforms=['iPhone','iPad','iPod'];
    if(iosPlatforms.includes(platform)){
        so='iOS';
    }
    return so;
}

mapa.addEventListener('click',function(){
    window.open("http://www.openstreetmap.org/?mlat="+coordenadas.lat+"&mlon="+coordenadas.lon+"&zoom=20");
});

function obtenerLugar(){
    coordenadas={lat:0,lon:0};
    navigator.geolocation.getCurrentPosition(function(position){
        coordenadas={lat:position.coords.latitude,lon:position.coords.longitude}
        fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat="+coordenadas.lat+"&lon="+coordenadas.lon)
        .then(response => response.json())
        .then(data =>{
        document.getElementById("Lugar").value=data.address.country+""+data.address.state;
        })
        .catch(error => {
        console.log(error);
        coordenadas={lat:0,lon:0};
        });
    });
}