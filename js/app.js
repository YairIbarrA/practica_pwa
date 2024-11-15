var url = window.location.href;
var swLocation = '/chat_heroes/sw.js'; // Ruta por defecto del Service Worker

// Verifica si el navegador soporta Service Workers
if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        // Si está en localhost, usa una ruta diferente para el Service Worker
        swLocation = '/sw.js';
    }

    // Registra el Service Worker utilizando la variable swLocation
    navigator.serviceWorker.register(swLocation)
        .then(reg => {
            console.log('Service Worker registrado correctamente', reg);
        })
        .catch(err => {
            console.warn('Error al registrar el Service Worker', err);
        });
}

// Referencias de jQuery
var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');
var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.seleccion-avatar');
var txtMensaje  = $('#txtMensaje');

// El usuario, contiene el ID del héroe seleccionado
var usuario;

// ===== Codigo de la aplicación

function crearMensajeHTML(mensaje, personaje) {
    var content =`
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            <div class="arrow"></div>
        </div>
    </li>
    `;
    timeline.prepend(content);
    cancelarBtn.click();
}

// Globals
function logIn(ingreso) {
    if (ingreso) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');
        titulo.text('Seleccione Personaje');
    }
}

// Selección de personaje
avatarBtns.on('click', function() {
    usuario = $(this).data('user');
    titulo.text('@' + usuario);
    logIn(true);
});

// Botón de salir
salirBtn.on('click', function() {
    logIn(false);
});

// Botón de nuevo mensaje
nuevoBtn.on('click', function() {
    modal.removeClass('oculto');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200);
});

// Botón de cancelar mensaje
cancelarBtn.on('click', function() {
    modal.animate({ 
        marginTop: '+=1000px',
        opacity: 0
    }, 200, function() {
        modal.addClass('oculto');
        txtMensaje.val('');
    });
});

// Botón de enviar mensaje
postBtn.on('click', function() {
    var mensaje = txtMensaje.val();
    if (mensaje.length === 0) {
        cancelarBtn.click();
        return;
    }
    crearMensajeHTML(mensaje, usuario);
});
