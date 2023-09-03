import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

export const createOrder = async (
  userId: string,
  orderedBooks: Order[]
): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId,
      orderedBooks: orderedBooks,
    },
  });

  return result;
};

const getAllOrders = async (
  userId: string,
  role: string
): Promise<Order[] | null> => {
  let result = null;
  if (role === 'customer') {
    result = await prisma.order.findMany({
      where: {
        userId,
      },
    });
  }

  if (role === 'admin') {
    result = await prisma.order.findMany({});
  }
  console.log(role, result);

  return result;
};

const getOrderById = async (
  orderId: string,
  userId: string,
  role: string
): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (role === 'customer') {
    if (result?.userId !== userId) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not allowed to access this order.'
      );
    }
  }

  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
};
