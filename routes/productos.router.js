import express from "express";
import ContenedorProductosDaos from "../DAOs/Producto.dao.js";

const router = express.Router();

const contenedorProductos = new ContenedorProductosDaos();

function validarAdmin(req, res, next) {
  if (req.query.admin) {
    next();
  } else {
    res.send("Usted no tiene acceso.");
  }
}

// Listar todos los productos cargados http://localhost:8080/api/productos DB OK
router.get("/", async (req, res) => {
  const listaProductos = await contenedorProductos.leerProductos()
  res.send(listaProductos);
});

// Listar producto por ID http://localhost:8080/api/productos/id DB OK
router.get("/:id", async (req, res) => {
  const productoBuscado = await contenedorProductos.listar(req.params.id)
  res.send(productoBuscado);
});

// Cargar producto a la lista con permisos Admin http://localhost:8080/api/productos/?admin=true DB OK
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

router.post("/", validarAdmin, async (req, res) => {
  console.log(req.body);
  const response = await contenedorProductos.guardoProductoEnDB(req.body)
  res.send(response)
});

// Eliminar producto de la lista por ID http://localhost:8080/api/productos/id?admin=true DB
router.delete("/:id", validarAdmin, async (req, res) => {
  const productoBorrado = await contenedorProductos.borrar(req.params.id)
  res.send(productoBorrado);
});

// Actualizar producto de la lista por ID http://localhost:8080/api/productos/id?admin=true DB OK
router.put("/:id", validarAdmin, async (req, res) => {
  await contenedorProductos.actualizar(req.body, req.params.id);
  const response = `Id: ${req.params.id} actualizado`
  res.status(200).json({response});
});

export default router;
