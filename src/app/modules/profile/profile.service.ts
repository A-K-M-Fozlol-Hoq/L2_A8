import { Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken'; // You need to import the JWT library you are using.

import prisma from '../../../shared/prisma';

// Define your route handler function.
const getUserProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming you are sending the token as a Bearer token.

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'Unauthorized: Token not provided',
      });
    }

    // Verify and decode the JWT token.
    const decodedToken: any = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual JWT secret.

    const { role, userId } = decodedToken;

    if (role !== 'customer' && role !== 'admin') {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        statusCode: httpStatus.FORBIDDEN,
        message:
          'Forbidden: You do not have permission to access this resource',
      });
    }

    // Retrieve the user's profile data based on userId.
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        role: true,
        contactNo: true,
        address: true,
        profileImg: true,
        // Exclude sensitive data like password from the response.
      },
    });

    if (!userProfile) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'User profile not found',
      });
    }

    return res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User profile retrieved successfully',
      data: userProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
};

// Export the route handler function.
export const ProfileController = {
  getUserProfile,
};
