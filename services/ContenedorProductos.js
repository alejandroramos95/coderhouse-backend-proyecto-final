import fs from "fs";

export default class ContenedorProductos {
  constructor() {}

  async leerProductos() {
    let file = [];
    try {
      const tempFile = await fs.promises.readFile("productos.txt", "utf-8");
      
      if (tempFile) file = JSON.parse(tempFile);
    } catch (e) {

    }
    return file;
  }

  async guardoProductoEnArchivo(producto) {
    const data = JSON.stringify(producto);
    await fs.promises.writeFile("productos.txt", data, "utf-8");
  }

  async listar(id) {
    const array = await this.leerProductos();
    let producto = array.find((prod) => prod.id === parseInt(id));
    return producto;
  }

  async guardar(prodNuevo) {
    const array = await this.leerProductos();
    prodNuevo.timeStamp = Date.now();
    if (array.length) {
      const arrayAOrdenar = [...array];
      const indice = arrayAOrdenar.sort((a, b) => b.id - a.id)[0].id;
      prodNuevo.id = indice + 1;
    } else {
      prodNuevo.id = 1;
    }
    array.push(prodNuevo);
    await this.guardoProductoEnArchivo(array);
    return prodNuevo;
  }

  async actualizar(prod, id) {
    const array = await this.leerProductos();
    prod.id = Number(id);
    let index = array.findIndex((prod) => prod.id === parseInt(id));
    console.log("index :", index);
    if (index >= 0) {
      array.splice(index, 1, prod);
      await this.guardoProductoEnArchivo(array);
    }
  }

  async borrar(id) {
    const array = await this.leerProductos();
    let index = array.findIndex((prod) => prod.id === parseInt(id));
    array.splice(index, 1);
    await this.guardoProductoEnArchivo(array);
  }
}
