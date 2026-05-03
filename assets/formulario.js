// --- Rangos de ingreso ---
const rangos = [
    "Menos de ₡300,000",
    "₡300,000 – ₡600,000",
    "₡600,000 – ₡1,000,000",
    "₡1,000,000 – ₡2,000,000",
    "₡2,000,000 – ₡3,000,000",
    "₡3,000,000 o más"
];

const rangoSlider = document.getElementById('rangoIngreso');
const rangoDisplay = document.getElementById('rangoDisplay');
const rangoTexto = document.getElementById('rangoTexto');

rangoSlider.addEventListener('input', function () {
    const label = rangos[parseInt(this.value)];
    rangoDisplay.textContent = label;
    rangoTexto.value = label;
});

// Calcular edad
const fechaInput = document.getElementById('fechaNacimiento');
const edadDisplay = document.getElementById('edadDisplay');
const edadOculta = document.getElementById('edadOculta');

fechaInput.addEventListener('change', function () {
    const hoy = new Date();
    const nac = new Date(this.value);
    if (isNaN(nac)) return;

    let edad = hoy.getFullYear() - nac.getFullYear();
    if (hoy.getMonth() < nac.getMonth() ||
        (hoy.getMonth() === nac.getMonth() && hoy.getDate() < nac.getDate())) {
        edad--;
    }

    if (edad <= 0 || edad > 120) {
        edadDisplay.textContent = '— Fecha inválida';
        edadOculta.value = '';
    } else {
        edadDisplay.textContent = `${edad} años`;
        edadOculta.value = edad;
    }
});

// --- Dropdown multiselect con chips ---
const trigger = document.getElementById('gradoTrigger');
const dropdown = document.getElementById('gradoDropdown');
const chipsBox = document.getElementById('gradoChips');
const hiddenBox = document.getElementById('gradoHiddenInputs');
const placeholder = document.getElementById('gradoPlaceholder');
let selectedGrados = [];

trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle('open');
    trigger.classList.toggle('open', isOpen);
});

document.addEventListener('click', function () {
    dropdown.classList.remove('open');
    trigger.classList.remove('open');
});

dropdown.addEventListener('click', function (e) {
    e.stopPropagation();
    const opt = e.target.closest('.multiselect-option');
    if (!opt) return;
    const val = opt.dataset.value;
    if (selectedGrados.includes(val)) {
        removeGrado(val);
    } else {
        addGrado(val);
    }
    opt.classList.toggle('selected', selectedGrados.includes(val));
});

function addGrado(val) {
    if (selectedGrados.includes(val)) return;
    selectedGrados.push(val);
    renderChips(); renderHidden();
}

function removeGrado(val) {
    selectedGrados = selectedGrados.filter(v => v !== val);
    document.querySelectorAll('.multiselect-option').forEach(o => {
        if (o.dataset.value === val) o.classList.remove('selected');
    });
    renderChips(); renderHidden();
}

function renderChips() {
    chipsBox.innerHTML = '';
    selectedGrados.forEach(val => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.innerHTML = `${val} <button type="button" class="chip-remove" data-val="${val}" title="Quitar">✕</button>`;
        chipsBox.appendChild(chip);
    });
    placeholder.textContent = selectedGrados.length
        ? `${selectedGrados.length} seleccionado${selectedGrados.length > 1 ? 's' : ''}`
        : 'Seleccionar grados...';
    placeholder.style.color = selectedGrados.length ? '#f1f5f9' : '';
    chipsBox.querySelectorAll('.chip-remove').forEach(btn => {
        btn.addEventListener('click', () => removeGrado(btn.dataset.val));
    });
}

function renderHidden() {
    hiddenBox.innerHTML = '';
    selectedGrados.forEach(val => {
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = 'grado_academico[]';
        inp.value = val;
        hiddenBox.appendChild(inp);
    });
}

// --- Validación y envío ---
document.getElementById('registroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }

    const generoSel = document.querySelector('input[name="genero"]:checked');
    if (!generoSel) {
        alert('Por favor seleccione su género.');
        return;
    }

    const grados = selectedGrados.slice();
    if (grados.length === 0) {
        alert('Por favor seleccione al menos un grado académico.');
        return;
    }

    const nombre = document.getElementById('nombreCompleto').value;
    const email = document.getElementById('email').value;
    const fecha = fechaInput.value;
    const edad = edadOculta.value;
    const rango = rangoTexto.value;
    const genero = generoSel.value;

    const asunto = encodeURIComponent(`Registro: ${nombre}`);
    const cuerpo = encodeURIComponent(
        `Nuevo registro recibido
========================
Nombre completo : ${nombre}
Correo          : ${email}
Fecha nacimiento: ${fecha}
Edad (calculada): ${edad} años
Género          : ${genero}
Rango de ingreso: ${rango}
Grado académico : ${grados.join(', ')}
`);

    window.location.href = `mailto:rhernandezsalas24@gmail.com?subject=${asunto}&body=${cuerpo}`;
});


// para que se vaean todas las opciones del dropdown

$('.multiselect-trigger')
  .on('click', function () {
    $(this).stop().animate({ marginBottom: "9rem" }, 200);
  });
 


