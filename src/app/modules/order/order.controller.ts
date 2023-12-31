import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const order = await OrderService.createOrder(userId, req.body);
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
    const orders = await OrderService.getAllOrders(
      req.user?.userId,
      req.user?.role
    );
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

const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user?.userId; // Extract user id from token
    const role = req.user?.role; // Extract user id from token
    const orders = await OrderService.getOrderById(orderId, userId, role);
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
  getOrderById,
};
