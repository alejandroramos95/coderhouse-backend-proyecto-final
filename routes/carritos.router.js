import express from "express";
import ContenedorCarritos from "../services/ContenedorCarritos.js";

const router = express.Router();

const contenedorCarritos = new ContenedorCarritos();

router.post("/", (req, res) => {
  const carritoCreado = contenedorCarritos.crearCarrito();
  res.send({ id: carritoCreado });
});

router.delete("/:id", (req, res) => {
  const carritoBorrado = contenedorCarritos.borrar(req.params.id);
  res.send(carritoBorrado);
});

router.get("/", (req, res) => {
  const listaCarritos = contenedorCarritos.leerCarritos().length
    ? contenedorCarritos.leerCarritos()
    : { error: "No hay carritos cargados" };
  res.send(listaCarritos);
});

router.get("/:id/productos", (req, res) => {
  const carrito = contenedorCarritos.obtenerCarrito(req.params.id);
  console.log('carrito route', carrito)
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

router.post("/:id/productos/:idPrd", (req, res) => {
  const respuesta = contenedorCarritos.guardarProductoEnCarrito(
    req.params.id,
    req.params.idPrd
  );
  res.send(respuesta);
});

/* router.delete("/:id/productos/:idPrd", (req, res) => {

  });
*/

export default router;
