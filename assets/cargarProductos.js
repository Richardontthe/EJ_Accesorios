const API_URL =
    "https://raw.githubusercontent.com/Richardontthe/ResourceHub/main/productos.json";

const TOTAL_PARTS = 5;
let allProducts = [];
let currentPart = 1;

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
    let htmlProd = '';
    products.forEach(producto => {
        htmlProd += `
    <div class="col-12 col-sm-6 col-md-4">
                        <div class="producto-card">

                            <div class="producto-img-wrapper">
                                <img src= "${producto.imagen}" alt="${producto.nombre}"
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


document.addEventListener("DOMContentLoaded", () => loadPart(1));

$(document).ready(function () {

    loadPart(1);


});