import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "not process",
      enum: ["not process", "processing", "shipped", "delivered"],
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);
