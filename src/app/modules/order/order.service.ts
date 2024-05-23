import mongoose from "mongoose";
import { ProductModel } from "../product/product.model";
import { OrderItem } from "./order.interface";
import { OrderModel } from "./order.model";
import { Session } from "inspector";

const createOrderIntoDB = async (orderData: OrderItem) => {
  const { email, productId, price, quantity } = orderData;

  const product = await ProductModel.findById(productId);
  if (!product) {
    return { success: false, message: "Product not found" };
  }

  // check is sufficient quantity is available

  if (product.inventory.quantity < quantity) {
    return { success: false, message: "Insufficient stock" };
  }

  //update inventory

  product.inventory.inStock = product.inventory.quantity > 0; //update isStock

  await product.save();
  const newOrder = await OrderModel.create({
    email,
    productId,
    price,
    quantity,
  });
  // return {
  //   success: true,
  //   message: "Order created successfully!",
  //   data: newOrder,
  // };
};

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};
const getOrdersByEmail = async (email: string) => {
  const result = await OrderModel.find({ email });
  if (result.length == 0) {
    throw new Error(`No orders found for email:${email}`);
  }
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrdersByEmail,
};
