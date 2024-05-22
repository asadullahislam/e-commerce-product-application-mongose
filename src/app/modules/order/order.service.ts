import { OrderItem } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (orderItem: OrderItem) => {
  const result = await OrderModel.create(orderItem);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};
const getOrdersByEmail = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrdersByEmail,
};
