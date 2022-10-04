import express from "express";
import ContenedorProductos from "../services/ContenedorProductos.js";

const router = express.Router();

const contenedorProductos = new ContenedorProductos();

function validarAdmin(req, res, next) {
  if (req.query.admin) {
    next();
  } else {
    res.send("Usted no tiene acceso.")
  }
}

router.get("/", (req, res) => {
  const listaProductos = contenedorProductos.listarAll();
  res.send(listaProductos);
});

router.get("/:id", (req, res) => {
  const productoBuscado = contenedorProductos.listar(req.params.id);
  res.send(productoBuscado);
});

router.post("/", validarAdmin, (req, res) => {
  console.log(req.body);
  const productoCreado = contenedorProductos.guardar(req.body);
  res.send(productoCreado);
});

router.delete("/:id", validarAdmin, (req, res) => {
  const productoBorrado = contenedorProductos.borrar(req.params.id);
  res.send(productoBorrado);
});

router.put("/:id", validarAdmin, (req, res) => {
  contenedorProductos.actualizar(req.body, req.params.id);
  res.status(200).json({});
});

export default router;
