import mongoose from "mongoose";
import ProductoModel from "../models/ProductoModel.js";

export default class ContenedorProductosDaos {
  constructor() {
    this.url =
      "mongodb+srv://coderBackend:coderBackendPW@clustercoderbackend.tct9by1.mongodb.net/ProyectoFinal?retryWrites=true&w=majority";
    this.mongodb = mongoose.connect;
  }

  async conectarDB() {
    await this.mongodb(this.url);
  }

  async leerProductos() {
    try {
      await this.conectarDB();
      return await ProductoModel.find();
    } catch (e) {}
  }

  async guardoProductoEnDB(producto) {
    try {
      await this.conectarDB();
      const nuevoProducto = new ProductoModel(producto);
      // Consologueo el ID para poder verificar getById (listar)
      console.log("ID del producto guardado: ", nuevoProducto.id);
      return await nuevoProducto.save();
    } catch (e) {
      console.log("Error guardoProductoEnDB: ", e);
    }
  }

  async listar(id) {
    try {
      await this.conectarDB();
      return await ProductoModel.findById(id);
    } catch (e) {
      console.log("Error listar: ", e);
    }
  }

  async actualizar(prod, id) {
    try {
      await this.conectarDB();
      await ProductoModel.findByIdAndUpdate(id, prod);
    } catch (e) {
      console.log("Error actualizar: ", e);
    }
  }

  async borrar(id) {
    try {
      await this.conectarDB();
      await ProductoModel.findByIdAndDelete(id);
    } catch (e) {
      console.log("Error borrar: ", e);
    }
  }
}
