import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orders = req.body;

    //data validation using zod
    const zodparsedData = OrderValidationSchema.parse(orders);
    const result = await OrderServices.createOrderIntoDB(zodparsedData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order is not created successfully",
      error: error,
    });
  }
};

const FetchOrders = async (req: Request, res: Response) => {
  try {
    const email = req.body.email as string;

    if (email) {
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
    res.status(500).json({
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
