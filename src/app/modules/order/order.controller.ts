import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId; // Extract user id from token
    const orderedBooks = req.body.orderedBooks;
    const order = await OrderService.createOrder(userId, orderedBooks);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error creating order',
      error: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error retrieving orders',
      error: error.message,
    });
  }
};

const getOrdersForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId; // Extract user id from token
    const orders = await OrderService.getOrdersForUser(userId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error retrieving orders',
      error: error.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrdersForUser,
};
