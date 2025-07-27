const productos = [
  { id: 1, nombre: "Camiseta", precio: 20, stock: 5, imagen: "img/camiseta.jpg" },
  { id: 2, nombre: "Pantalón", precio: 40, stock: 3, imagen: "img/pantalon.jpg" },
  { id: 3, nombre: "Zapatos", precio: 60, stock: 2, imagen: "img/zapatos.jpg" },
  { id: 4, nombre: "Gorra", precio: 15, stock: 4, imagen: "img/gorra.jpg" }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}" style="width:100%; height:auto; border-radius:5px;" />
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <p>En stock: ${prod.stock}</p>
      <button onclick="agregarAlCarrito(${prod.id})" ${prod.stock === 0 ? "disabled" : ""}>Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    carrito.push({ ...producto });
    producto.stock--;
    actualizarCarrito();
    mostrarProductos();
  }
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    total += item.precio;
    const p = document.createElement("p");
    p.textContent = `${item.nombre} - $${item.precio}`;
    lista.appendChild(p);
  });
  document.getElementById("total").textContent = total;
}

function vaciarCarrito() {
  carrito = [];
  productos.forEach(p => {
    p.stock = p.id === 1 ? 5 : p.id === 2 ? 3 : p.id === 3 ? 2 : 4;
  });
  actualizarCarrito();
  mostrarProductos();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
});