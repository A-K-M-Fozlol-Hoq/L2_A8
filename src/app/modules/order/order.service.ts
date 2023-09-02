import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOrder, IOrderedBook } from './order.interface';

export const createOrder = async (
  userId: string,
  orderedBooks: IOrderedBook[]
): Promise<IOrder> => {
  const orderData: Prisma.OrderCreateInput = {
    user: {
      connect: { id: userId }, // Assuming your User model has an 'id' field
    },
    orderedBooks: {
      create: orderedBooks,
    },
    status: 'pending',
  };
  const order = await prisma.order.create({
    data: orderData,
    include: {
      orderedBooks: true,
    },
  });
  return order;
};

export const getAllOrders = async (): Promise<IOrder[]> => {
  const orders = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });
  return orders;
};

export const getOrdersForUser = async (userId: string): Promise<IOrder[]> => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return orders;
};

const getOrderById = async (req: Request, res: Response) => {
  console.log(req, res);
  // try {
  //   const { orderId } = req.params;
  //   const token = req.headers.authorization?.split(' ')[1]; // Assuming you are sending the token as a Bearer token.
  //   if (!token) {
  //     return res.status(httpStatus.UNAUTHORIZED).json({
  //       success: false,
  //       statusCode: httpStatus.UNAUTHORIZED,
  //       message: 'Unauthorized: Token not provided',
  //     });
  //   }
  //   // Verify and decode the JWT token.
  //   const decodedToken: any = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual JWT secret.
  //   const { role, userId } = decodedToken;
  //   if (role === 'admin') {
  //     // Admins can access any order.
  //     const order = await prisma.order.findUnique({
  //       where: { id: orderId },
  //     });
  //     if (!order) {
  //       return res.status(httpStatus.NOT_FOUND).json({
  //         success: false,
  //         statusCode: httpStatus.NOT_FOUND,
  //         message: 'Order not found',
  //       });
  //     }
  //     return res.status(httpStatus.OK).json({
  //       success: true,
  //       statusCode: httpStatus.OK,
  //       message: 'Order fetched successfully',
  //       data: order,
  //     });
  //   } else if (role === 'customer') {
  //     // Customers can only access their own orders.
  //     const order = await prisma.order.findUnique({
  //       where: { id: orderId, userId },
  //     });
  //     if (!order) {
  //       return res.status(httpStatus.NOT_FOUND).json({
  //         success: false,
  //         statusCode: httpStatus.NOT_FOUND,
  //         message: 'Order not found',
  //       });
  //     }
  //     return res.status(httpStatus.OK).json({
  //       success: true,
  //       statusCode: httpStatus.OK,
  //       message: 'Order fetched successfully',
  //       data: order,
  //     });
  //   } else {
  //     return res.status(httpStatus.FORBIDDEN).json({
  //       success: false,
  //       statusCode: httpStatus.FORBIDDEN,
  //       message: 'Forbidden: You do not have permission to access this resource',
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
  //     success: false,
  //     statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  //     message: 'Internal Server Error',
  //   });
  // }
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrdersForUser,
  getOrderById,
};
