import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IUser, IUserFilterRequest } from './user.interface';

const getAllUsers = async (filters: IUserFilterRequest): Promise<IUser[]> => {
  const result = await prisma.user.findMany({
    where: filters,
  });
  return result;
};

const getUserById = async (id: string): Promise<IUser | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateUserById = async (
  id: string,
  userUpdates: Prisma.UserUpdateInput
): Promise<IUser> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: userUpdates,
  });
  return result;
};

const deleteUserById = async (id: string): Promise<IUser> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
