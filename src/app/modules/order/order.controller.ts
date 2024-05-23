import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    const zodParsedOrderData = OrderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrderIntoDB(zodParsedOrderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
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

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;

    console.log(email);
    if (email) {
      const queryOrder = await OrderServices.getOrdersByEmail(email);

      if (queryOrder.length == 0) {
        res.status(404).json({
          success: false,
          message: `No orders found for this email:${email} address.`,
        });
      }
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: queryOrder,
      });
    } else {
      const result = await OrderServices.getAllOrderFromDB();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Orders is not fetched successfully!",
      error: error,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
