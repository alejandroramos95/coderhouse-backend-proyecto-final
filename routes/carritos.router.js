import express from "express";
import ContenedorCarritos from "../services/ContenedorCarritos.js";

const router = express.Router();

const contenedorCarritos = new ContenedorCarritos();

// Crear carrito http://localhost:8080/api/carrito/
router.post("/", (req, res) => {
  const carritoCreado = contenedorCarritos.crearCarrito();
  res.send({ id: carritoCreado });
});

// Eliminar carrito http://localhost:8080/api/carrito/1
router.delete("/:id", (req, res) => {
  const carritoBorrado = contenedorCarritos.borrar(req.params.id);
  res.send(carritoBorrado);
});

// Listar todos los carritos http://localhost:8080/api/carrito/
router.get("/", (req, res) => {
  const listaCarritos = contenedorCarritos.leerCarritos().length
    ? contenedorCarritos.leerCarritos()
    : { error: "No hay carritos cargados" };
  res.send(listaCarritos);
});

// Listar productos dentros del carrito por ID http://localhost:8080/api/carrito/1/productos
router.get("/:id/productos", (req, res) => {
  const carrito = contenedorCarritos.obtenerCarrito(req.params.id);
  console.log("carrito route", carrito);
  let response;
  if (!carrito) {
    response = { error: "No existe el carrito." };
  } else if (!carrito.productos.length) {
    response = { error: "Este carrito no tiene productos." };
  } else {
    response = carrito;
  }
  res.send(response);
});

// Ingresar productos por ID al carrito por su ID http://localhost:8080/api/carrito/1/productos/1
router.post("/:id/productos/:idPrd", (req, res) => {
  const response = contenedorCarritos.guardarProductoEnCarrito(
    req.params.id,
    req.params.idPrd
  );
  res.send(response);
});

// Eliminar un producto del carrito por ID
router.delete("/:id/productos/:idPrd", (req, res) => {
  const response = contenedorCarritos.eliminarProductoDeCarrito(
    req.params.id,
    req.params.idPrd
  );
  res.send(response);
});

export default router;
