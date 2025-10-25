const listaCarrito = document.getElementById("lista-carrito");
const total = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar");

let carrito = [];

// Función para actualizar el carrito visualmente
function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let totalCompra = 0;

  carrito.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
    
    // Opcional: botón para eliminar un producto del carrito
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.style.cursor = "pointer";
    btnEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      actualizarCarrito();
    });

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    totalCompra += p.precio;
  });

  total.textContent = totalCompra.toFixed(2);
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

// Agregar productos al carrito al hacer click
const botonesAgregar = document.querySelectorAll(".agregar");
botonesAgregar.forEach(btn => {
  btn.addEventListener("click", () => {
    // Tomamos el contenedor padre del producto
    const producto = btn.parentElement;
    const nombre = producto.querySelector("h3").textContent;
    const precio = parseFloat(producto.querySelector("p").textContent.replace("$", ""));

    carrito.push({ nombre, precio });
    actualizarCarrito();
  });
});
