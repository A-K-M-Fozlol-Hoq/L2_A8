import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IUser } from '../user/user.interface';

const getUserProfile = async (
  userId: string
): Promise<Partial<IUser> | null> => {
  const userProfile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  if (!userProfile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  return userProfile;
};

export const ProfileService = {
  getUserProfile,
};
