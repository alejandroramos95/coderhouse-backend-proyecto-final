import express from "express";
import routerCarrito from "./routes/carritos.router.js"
import routerProductos from "./routes/productos.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.all('*', (req, res) => {
	res.status(404).send({error: -2, descripcion: `Ruta '${req.originalUrl}' no implementada` });
	});

const PORT = 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));