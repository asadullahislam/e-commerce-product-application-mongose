import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order is not created successfully!",
      error: error,
    });
  }
};
const FetchOrders = async (req: Request, res: Response) => {
  try {
    const email = req.body.email as string;

    if (email) {
      if (!isValidEmail) {
        res.status(400).json({
          success: false,
          message: "Invalid email format",
        });
        return;
      }
      const userOrders = await OrderServices.getOrdersByEmail(email);
      res.json({
        success: true,
        message: `Orders fetched successfully for user email: ${email}`,
        data: userOrders,
      });
    } else {
      const allorders = await OrderServices.getAllOrderFromDB();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: allorders,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "An error occurred while fetching orders",
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  FetchOrders,
};
