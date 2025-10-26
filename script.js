document.addEventListener('DOMContentLoaded', () => {
    const productosContainer = document.getElementById('productos-container');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let productos = [];

    // Carga productos desde localStorage o desde data.json si es la primera vez
    async function cargarProductos() {
        const productosStorage = localStorage.getItem('productos');
        if (productosStorage) {
            productos = JSON.parse(productosStorage);
        } else {
            try {
                const response = await fetch('data.json');
                productos = await response.json();
                localStorage.setItem('productos', JSON.stringify(productos));
            } catch (error) {
                console.error("No se pudieron cargar los productos:", error);
            }
        }
        renderizarProductos();
    }

    function renderizarProductos() {
        productosContainer.innerHTML = '';
        productos.forEach(producto => {
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');
            divProducto.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${parseFloat(producto.precio).toFixed(2)}</p>
                <button class="agregar" data-id="${producto.id}">Agregar</button>
            `;
            productosContainer.appendChild(divProducto);
        });
    }

    function agregarAlCarrito(e) {
        if (e.target.classList.contains('agregar')) {
            const productoId = parseInt(e.target.getAttribute('data-id'));
            const productoSeleccionado = productos.find(p => p.id === productoId);
            
            const itemEnCarrito = carrito.find(item => item.id === productoId);
            if (itemEnCarrito) {
                itemEnCarrito.cantidad++;
            } else {
                carrito.push({ ...productoSeleccionado, cantidad: 1 });
            }
            actualizarCarrito();
        }
    }
    
    function actualizarCarrito() {
        listaCarrito.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} (x${item.cantidad}) - $${(item.precio * item.cantidad).toFixed(2)}`;
            listaCarrito.appendChild(li);
            total += item.precio * item.cantidad;
        });
        totalSpan.textContent = total.toFixed(2);
        guardarCarritoEnStorage();
    }

    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
    }

    function guardarCarritoEnStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Event Listeners
    productosContainer.addEventListener('click', agregarAlCarrito);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Carga inicial
    cargarProductos();
    actualizarCarrito();
});