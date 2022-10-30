import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema(
  {
    productos: [],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const CarritoModel = mongoose.model("carrito", carritoSchema);

export default CarritoModel;