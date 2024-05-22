import { model, Schema } from "mongoose";
import { OrderItem } from "./order.interface";

//order schema
const OrderSchema = new Schema<OrderItem>({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  productId: {
    type: String,
    required: [true, "productId is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
  },
});

export const OrderModel = model<OrderItem>("order", OrderSchema);
