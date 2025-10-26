document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nuevo-producto-form');
    const tablaBody = document.getElementById('tabla-productos-body');

    // La única fuente de verdad son los productos en localStorage
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    function guardarProductosEnStorage() {
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function renderizarTabla() {
        tablaBody.innerHTML = '';
        productos.forEach(producto => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${parseFloat(producto.precio).toFixed(2)}</td>
                <td><img src="../${producto.imagen}" width="50"></td>
                <td>
                    <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }

    function agregarProducto(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre-producto').value;
        const precio = parseFloat(document.getElementById('precio-producto').value);
        const imagen = document.getElementById('imagen-producto').value;

        if (nombre && !isNaN(precio) && imagen) {
            const nuevoProducto = {
                id: Date.now(), // ID único basado en la fecha actual
                nombre,
                precio,
                imagen
            };

            productos.push(nuevoProducto);
            guardarProductosEnStorage();
            renderizarTabla();
            form.reset();
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    }

    function eliminarProducto(e) {
        if (e.target.classList.contains('btn-eliminar')) {
            const idAEliminar = parseInt(e.target.getAttribute('data-id'));
            // Filtramos el array, creando uno nuevo sin el producto eliminado
            productos = productos.filter(p => p.id !== idAEliminar);
            guardarProductosEnStorage();
            renderizarTabla();
        }
    }

    // Event Listeners
    form.addEventListener('submit', agregarProducto);
    tablaBody.addEventListener('click', eliminarProducto);

    // Carga inicial de la tabla
    renderizarTabla();
});