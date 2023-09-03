import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

// Create Order
router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.createOrder
);

// Get All Orders (Admin Only)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);

// Get Orders for User (Customer Only)
router.get(
  '/user-orders',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrdersForUser
);

export const orderRouter = router;
