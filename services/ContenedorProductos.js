import fs from "fs";

export default class ContenedorProductos {
  constructor() {}

  leerProductos() {
    let file = [];
    try {
      const tempFile = fs.readFileSync("productos.txt", "utf-8");
      if (tempFile) file = JSON.parse(tempFile);
    } catch (e) {}
    return file;
  }

  guardoProductoEnArchivo(producto) {
    const data = JSON.stringify(producto);
    fs.writeFileSync("productos.txt", data, "utf-8");
  }

  listar(id) {
    const array = this.leerProductos();
    let producto = array.find((prod) => prod.id === parseInt(id));
    return producto;
  }

  guardar(prodNuevo) {
    const array = this.leerProductos();
    prodNuevo.timeStamp = Date.now();
    if (array.length) {
      const arrayAOrdenar = [...array];
      const indice = arrayAOrdenar.sort((a, b) => b.id - a.id)[0].id;
      prodNuevo.id = indice + 1;
    } else {
      prodNuevo.id = 1;
    }
    array.push(prodNuevo);
    this.guardoProductoEnArchivo(array);
    return prodNuevo;
  }

  actualizar(prod, id) {
    const array = this.leerProductos();
    prod.id = Number(id);
    let index = array.findIndex((prod) => prod.id === parseInt(id));
    console.log("index :", index);
    if (index >= 0) {
      array.splice(index, 1, prod);
      this.guardoProductoEnArchivo(array);
    }
  }

  borrar(id) {
    const array = this.leerProductos();
    let index = array.findIndex((prod) => prod.id === parseInt(id));
    array.splice(index, 1);
    this.guardoProductoEnArchivo(array);
  }
}
