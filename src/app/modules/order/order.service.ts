import { ProductModel } from "../product/product.model";
import { OrderItem } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (orderData: OrderItem) => {
  const { email, productId, price, quantity } = orderData;

  const product = await ProductModel.findById(productId);

  if (!product) {
    return { success: false, message: "Product not found" };
  }

  // check is sufficient quantity is available

  if (product.inventory.quantity < quantity) {
    return {
      success: false,
      message: "Insufficient quantity available in inventory",
    };
  }

  //update inventory
  product.inventory.quantity -= quantity;

  product.inventory.inStock = product.inventory.quantity > 0; //update isStock

  await product.save();
  const newOrder = await OrderModel.create({
    email,
    productId,
    price,
    quantity,
  });
  return newOrder;
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
