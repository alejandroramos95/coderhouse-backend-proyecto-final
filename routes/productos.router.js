import express from "express";
import ContenedorProductos from "../services/ContenedorProductos.js";

const router = express.Router();

const contenedorProductos = new ContenedorProductos();

function validarAdmin(req, res, next) {
  if (req.query.admin) {
    next();
  } else {
    res.send("Usted no tiene acceso.");
  }
}

// Listar todos los productos cargados http://localhost:8080/api/productos
router.get("/", (req, res) => {
  const listaProductos = contenedorProductos.leerProductos().length
    ? contenedorProductos.leerProductos()
    : { error: "No hay productos cargados" };
  res.send(listaProductos);
});

// Listar producto por ID http://localhost:8080/api/productos/1
router.get("/:id", (req, res) => {
  const productoBuscado = contenedorProductos.listar(req.params.id)
    ? contenedorProductos.listar(req.params.id)
    : { error: "Producto no encontrado" };
  res.send(productoBuscado);
});

// Cargar producto a la lista con permisos Admin http://localhost:8080/api/productos/?admin=true
/*
Producto ejemplo para Postman
{
    "Nombre": "Jugo",
    "Descripcion": "Liquido",
    "Codigo": "11111",
    "Link-Foto": "https://assets.stickpng.com/images/580b585b2edbce24c47b2780.png",
    "Precio": "100",
    "Stock": "999"
}
*/

router.post("/", validarAdmin, (req, res) => {
  console.log(req.body);
  const productoCreado = contenedorProductos.guardar(req.body);
  res.send(productoCreado);
});

// Eliminar producto de la lista por ID http://localhost:8080/api/productos/1?admin=true
router.delete("/:id", validarAdmin, (req, res) => {
  const productoBorrado = contenedorProductos.borrar(req.params.id);
  res.send(productoBorrado);
});

// Actualizar producto de la lista por ID http://localhost:8080/api/productos/1?admin=true
router.put("/:id", validarAdmin, (req, res) => {
  contenedorProductos.actualizar(req.body, req.params.id);
  res.status(200).json({});
});

export default router;
