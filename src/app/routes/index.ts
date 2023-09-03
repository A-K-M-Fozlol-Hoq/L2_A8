import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { bookRoutes } from '../modules/book/book.routes';
import { categoryRoutes } from '../modules/category/category.routes';
import { orderRouter } from '../modules/order/order.routes';
import { profileRoutes } from '../modules/profile/profile.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
