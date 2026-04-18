const API_URL =
    "https://raw.githubusercontent.com/Richardontthe/ResourceHub/main/productos.json";

const TOTAL_PARTS = 5;
let allProducts = [];
let currentPart = 1;

 const buscador = document.getElementById("buscador-productos");
const btnLimpiar = document.getElementById("btn-limpiar");



async function fetchProducts() {
    if (allProducts.length > 0) return allProducts;
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar los productos");
    allProducts = await response.json();
    return allProducts;
}

function getProductsByPart(part) {
    //Redondeo para separarlos por partes 
    const itemsPerPart = Math.ceil(allProducts.length / TOTAL_PARTS);
    const start = (part - 1) * itemsPerPart;
    const end = start + itemsPerPart;
    //Partimos el array 
    return allProducts.slice(start, end);
}

function renderProducts(products) {
    const container = document.getElementById("productos-grid");
    let contadorProd = document.getElementById("productos-count");
    let htmlProd = '';
    products.forEach(producto => {
        htmlProd += `
    <div class="col-12 col-sm-6 col-md-4">
                        <div class="producto-card">

                            <div class="producto-img-wrapper">
                                <img src= "${producto.imagen}.jpg" alt="${producto.nombre}"
                                    class="producto-img" />
                                <span class="producto-badge">${producto.categoria}</span>
                            </div>

                            <div class="producto-body">
                                <h5 class="producto-nombre">${producto.nombre}</h5>
                                <p class="producto-descripcion">
                                    ${producto.descripcion}
                                </p>
                                <div class="producto-footer d-flex justify-content-center text-center">
                                    <span class="producto-precio w-100">${producto.precio}</span>
                                    <!-- <div class="producto-cantidad">
                                        <button class="cantidad-btn" aria-label="Disminuir">
                                            <span class="material-symbols-outlined">remove</span>
                                        </button>
                                        <span class="cantidad-valor">1</span>
                                        <button class="cantidad-btn" aria-label="Aumentar">
                                            <span class="material-symbols-outlined">add</span>
                                        </button>
                                    </div> -->
                                </div>
                                <!-- <button class="btn-agregar-carrito w-100">
                                    <span class="material-symbols-outlined">shopping_cart</span>
                                    Agregar al carrito
                                </button> -->
                            </div>

                        </div>
                    </div>
    
    
    `;


    });

    container.innerHTML = htmlProd;
    contadorProd.textContent = `Mostrando ${products.length} productos`;
    

}



async function loadPart(part) {
    currentPart = part;
    try {
        await fetchProducts();
        const products = getProductsByPart(part);
        renderProducts(products);
        renderPaginationButtons();
    } catch (error) {
        console.error(error);
        document.getElementById("products-container").innerHTML =
            `<p class="error">No se pudieron cargar los productos. Intenta de nuevo.</p>`;
    }
}

// para colorear botones 

function colorPaginationButton(partName){
    let part1 = document.getElementById('prodPart1');
    let part2 = document.getElementById('prodPart2');
    let part3 = document.getElementById('prodPart3');
    let part4 = document.getElementById('prodPart4');
    let part5 = document.getElementById('prodPart5');


    switch (partName) {
        case "prodPart1":
            part1.classList.add("page-btn-active");
            part2.classList.remove("page-btn-active");
            part3.classList.remove("page-btn-active");
            part4.classList.remove("page-btn-active");
            part5.classList.remove("page-btn-active");
            break;
        case "prodPart2":
            part2.classList.add("page-btn-active");
            part1.classList.remove("page-btn-active");
            part3.classList.remove("page-btn-active");
            part4.classList.remove("page-btn-active");
            part5.classList.remove("page-btn-active");
            break;
        case "prodPart3":
            part3.classList.add("page-btn-active");
            part1.classList.remove("page-btn-active");
            part2.classList.remove("page-btn-active");
            part4.classList.remove("page-btn-active");
            part5.classList.remove("page-btn-active");
            break;
        case "prodPart4":
            part4.classList.add("page-btn-active");
            part1.classList.remove("page-btn-active");
            part2.classList.remove("page-btn-active");
            part3.classList.remove("page-btn-active");
             part5.classList.remove("page-btn-active");
            break;
        case "prodPart5":
            part5.classList.add("page-btn-active");
            part1.classList.remove("page-btn-active");
            part2.classList.remove("page-btn-active");
            part3.classList.remove("page-btn-active");
             part4.classList.remove("page-btn-active");
            break;
   
    }
    
}

 buscador.addEventListener("input", function () {
    const termino = buscador.value.toLowerCase().trim();
    btnLimpiar.style.display = termino ? "inline-flex" : "none";

    const productosFiltrados = allProducts.filter(p =>
        p.nombre.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
    );

    const sinResultados = document.getElementById("sin-resultados");

    if (productosFiltrados.length === 0) {
        document.getElementById("productos-grid").innerHTML = "";
        document.getElementById("termino-buscado").textContent = termino;
        sinResultados.classList.remove("d-none");
        document.getElementById("productos-count").textContent = "Sin resultados";
    } else {
        sinResultados.classList.add("d-none");
        renderProducts(productosFiltrados);
    }
});

btnLimpiar.addEventListener("click", function () {
    buscador.value = "";
    btnLimpiar.style.display = "none";
    document.getElementById("sin-resultados").classList.add("d-none");
    const products = getProductsByPart(currentPart);
    renderProducts(products);
});




document.addEventListener("DOMContentLoaded", () => loadPart(1));

$(document).ready(function () {

    loadPart(1);

    $("#prodPart1").click(function () {
        loadPart(1);
        colorPaginationButton("prodPart1");
    } );
    $("#prodPart2").click(function () {
        loadPart(2);
        colorPaginationButton("prodPart2");
    });
    $("#prodPart3").click(function () {
        loadPart(3);
        colorPaginationButton("prodPart3");
    });
    $("#prodPart4").click(function () {
        loadPart(4);
        colorPaginationButton("prodPart4");
    });
    $("#prodPart5").click(function () {
        loadPart(5);
        colorPaginationButton("prodPart5");
    });
 

});

