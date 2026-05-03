// horario dinamico 

document.addEventListener('DOMContentLoaded', function () {

    const ahora = new Date();
    const hora  = ahora.getHours();
    const dia   = ahora.getDay(); // 0=dom, 6=sab

    const dot   = document.querySelector('.horario-estado-dot');
    const texto = document.querySelector('.horario-estado-texto');

    // Verificamos que los elementos existan antes de manipularlos
    if (!dot || !texto) return;

    const abierto =
        (dia >= 1 && dia <= 5 && hora >= 8 && hora < 18) ||  // lun-vie
        (dia === 6 && hora >= 8 && hora < 16);                // sábado

    dot.classList.toggle('abierto', abierto);
    dot.classList.toggle('cerrado', !abierto);
    texto.textContent = abierto ? 'Abierto ahora' : 'Cerrado en este momento';

});