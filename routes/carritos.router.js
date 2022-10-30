import express from "express";
import ContenedorCarritosDaos from "../DAOs/Carrito.dao.js";

const router = express.Router();

const contenedorCarritos = new ContenedorCarritosDaos();

// Crear carrito http://localhost:8080/api/carrito/ DB OKok
router.post("/", async (req, res) => {
  const carritoCreado = await contenedorCarritos.crearCarritoEnDB();
  res.send({ id: carritoCreado });
});

// Eliminar carrito http://localhost:8080/api/carrito/1 DB OKok
router.delete("/:id", async (req, res) => {
  const carritoBorrado = await contenedorCarritos.borrar(req.params.id);
  res.send(carritoBorrado);
});

// Listar todos los carritos http://localhost:8080/api/carrito/ DB OKok
router.get("/", async (req, res) => {
  const listaCarritos = await contenedorCarritos.leerCarritos();
  const response = listaCarritos.length
    ? listaCarritos
    : { error: "No hay carritos cargados." };
  res.send(response);
});

// Listar productos dentros del carrito por ID http://localhost:8080/api/carrito/1/productos DB OKok
router.get("/:id/productos", async (req, res) => {
  const carrito = await contenedorCarritos.obtenerCarrito(req.params.id);
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

// Ingresar productos por ID al carrito por su ID http://localhost:8080/api/carrito/1/productos/1 DB OKok
router.post("/:id/productos/:idPrd", async (req, res) => {
  const response = await contenedorCarritos.guardarProductoEnCarrito(
    req.params.id,
    req.params.idPrd
  );
  res.send(response);
});

// Eliminar un producto del carrito por ID http://localhost:8080/api/carrito/1/productos/1 DB
router.delete("/:id/productos/:idPrd", async (req, res) => {
  const response = await contenedorCarritos.eliminarProductoDeCarrito(
    req.params.id,
    req.params.idPrd
  );
  res.send(response);
});

export default router;
