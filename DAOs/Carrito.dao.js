import mongoose from "mongoose";
import ContenedorProductosDaos from "./Producto.dao.js";
import CarritoModel from "../models/CarritoModel.js";

export default class ContenedorCarritosDaos {
  constructor() {
    this.url =
      "mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/ProyectoFinal?retryWrites=true&w=majority";
    this.mongodb = mongoose.connect;
    this.producto = new ContenedorProductosDaos();
  }

  async conectarDB() {
    await this.mongodb(this.url);
  }

  async leerCarritos() {
    try {
      await this.conectarDB();
      return await CarritoModel.find();
    } catch (e) {}
  }

  async obtenerCarrito(id) {
    try {
      await this.conectarDB();
      return await CarritoModel.findById(id);
    } catch (e) {}
  }

  async crearCarritoEnDB() {
    try {
      await this.conectarDB();
      const nuevoCarrito = new CarritoModel();
      // Consologueo el ID para poder verificar getById
      console.log("ID del carrito creado: ", nuevoCarrito.id);
      await nuevoCarrito.save();
    } catch (e) {}
  }

  async guardarProductoEnCarrito(idCarrito, idProd) {
    try {
      await this.conectarDB();
      const prod = await this.producto.listar(idProd);
      //console.log(producto)
      // const carr = await this.obtenerCarrito(idCarrito);
      //console.log(carrito)
      await CarritoModel.findByIdAndUpdate(idCarrito, {
        $push: { productos: prod },
      });
      //console.log("producto temp", prod)
    } catch (e) {}
  }

  async borrar(id) {
    await this.conectarDB();
    await CarritoModel.findByIdAndDelete(id);
    try {
    } catch (e) {}
  }

  async eliminarProductoDeCarrito(idCarrito, idProd) {
    try {
      await this.conectarDB();
      const prod = await this.producto.listar(idProd);
      await CarritoModel.findByIdAndUpdate(idCarrito, {
        $pull: { productos: prod },
      });
    } catch (e) {}
  }
}
