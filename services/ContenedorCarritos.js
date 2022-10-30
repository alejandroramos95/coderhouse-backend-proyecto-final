import fs from "fs";
import ContenedorProductos from "../services/ContenedorProductos.js";

const contenedorProductos = new ContenedorProductos();

export default class ContenedorCarritos {
  constructor() {}

  async leerCarritos() {
    let file = [];
    try {
      const tempFile = await fs.promises.readFile("carritos.txt", "utf-8");
      if (tempFile) file = JSON.parse(tempFile);
    } catch (e) {}
    return file;
  }

  async actualizarCarritosEnArchivo(carrito) {
    const data = JSON.stringify(carrito);
    await fs.promises.writeFile("carritos.txt", data, "utf-8");
  }

  async obtenerCarrito(id) {
    const array = await this.leerCarritos();
    let carrito = array.find((carr) => carr.id === parseInt(id));
    return carrito;
  }

  async crearCarrito() {
    let carritoNuevo = {};

    carritoNuevo.id = await this.generarNuevoId();
    carritoNuevo.timeStamp = Date.now();
    carritoNuevo.productos = [];

    const array = await this.leerCarritos();
    array.push(carritoNuevo);
    await this.actualizarCarritosEnArchivo(array);
    return carritoNuevo.id;
  }

  async guardarProductoEnCarrito(idCarrito, idProd) {
    const producto = await contenedorProductos.listar(idProd);
    const carro = await this.obtenerCarrito(idCarrito);
    carro.productos.push(producto);
    const listaCarritos = await this.leerCarritos();
    for (let i = 0; i < listaCarritos.length; i++) {
      if (listaCarritos[i].id == idCarrito)
        listaCarritos[i].productos = carro.productos;
    }
    await this.actualizarCarritosEnArchivo(listaCarritos);
  }

  async borrar(id) {
    const array = await this.leerCarritos();
    let index = array.findIndex((prod) => prod.id === parseInt(id));
    array.splice(index, 1);
    await this.actualizarCarritosEnArchivo(array);
  }

  async generarNuevoId() {
    let id;
    const array = await this.leerCarritos();
    if (array.length) {
      const arrayAOrdenar = [...array];
      const indice = arrayAOrdenar.sort((a, b) => b.id - a.id)[0].id;
      id = indice + 1;
    } else {
      id = 1;
    }
    return id;
  }

  async eliminarProductoDeCarrito(idCarrito, idProd) {
    const array = await this.leerCarritos();
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == idCarrito)
        array[i].productos = array[i].productos.filter(
          (prod) => prod.id != idProd
        );
    }
    await this.actualizarCarritosEnArchivo(array);
  }
}
