import fs from "fs";
import ContenedorProductos from "../services/ContenedorProductos.js";

const contenedorProductos = new ContenedorProductos();

export default class ContenedorCarritos {
  constructor() {}

  leerCarritos() {
    let file = [];
    try {
      const tempFile = fs.readFileSync("carritos.txt", "utf-8");
      if (tempFile) file = JSON.parse(tempFile);
    } catch (e) {}
    return file;
  }

  actualizarCarritosEnArchivo(carrito) {
    const data = JSON.stringify(carrito);
    fs.writeFileSync("carritos.txt", data, "utf-8");
  }

  obtenerCarrito(id) {
    const array = this.leerCarritos();
    console.log("array obtener carrito", array);
    let carrito = array.find((carr) => carr.id === parseInt(id));
    return carrito;
  }

  crearCarrito() {
    let carritoNuevo = {};

    carritoNuevo.id = this.generarNuevoId();
    carritoNuevo.timeStamp = Date.now();
    carritoNuevo.productos = [];

    const array = this.leerCarritos();
    array.push(carritoNuevo);
    this.actualizarCarritosEnArchivo(array);
    return carritoNuevo.id;
  }

  guardarProductoEnCarrito(idCarrito, idProd) {
    const producto = contenedorProductos.listar(idProd);
    const carro = this.obtenerCarrito(idCarrito);
    carro.productos.push(producto);
    const listaCarritos = this.leerCarritos();
    for (let i = 0; i < listaCarritos.length; i++) {
      if (listaCarritos[i].id == idCarrito) listaCarritos[i].productos = carro.productos;
    }
    this.actualizarCarritosEnArchivo(listaCarritos);
  }

  borrar(id) {
    const array = this.leerCarritos();
    let index = array.findIndex((prod) => prod.id === parseInt(id));
    array.splice(index, 1);
    this.actualizarCarritosEnArchivo(array);
  }

  generarNuevoId() {
    let id;
    const array = this.leerCarritos();
    if (array.length) {
      const arrayAOrdenar = [...array];
      const indice = arrayAOrdenar.sort((a, b) => b.id - a.id)[0].id;
      id = indice + 1;
    } else {
      id = 1;
    }
    return id;
  }

  
}
