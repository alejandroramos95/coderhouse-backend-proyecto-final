import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    Nombre: String,
    Descripcion: String,
    Codigo: Number,
    LinkFoto: String,
    Precio: Number,
    Stock: Number,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const ProductoModel = mongoose.model("producto", productoSchema);

export default ProductoModel;
