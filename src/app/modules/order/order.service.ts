import { ProductModel } from "../product/product.model";
import { OrderItem } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (orderData: OrderItem) => {
  const { email, productId, price, quantity } = orderData;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // Check if sufficient quantity is available
    if (product.inventory.quantity < quantity) {
      return {
        success: false,
        message: "Insufficient quantity available in inventory",
      };
    }

    // Update inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0; // Update inStock
    await product.save();

    const newOrder = await OrderModel.create({
      email,
      productId,
      price,
      quantity,
    });

    return { success: true, data: newOrder };
  } catch (error) {
    return {
      success: false,
      message: "Order not found",
    };
  }
};

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};
const getOrdersByEmail = async (email: string) => {
  const orders = await OrderModel.find({ email });
  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrdersByEmail,
};
