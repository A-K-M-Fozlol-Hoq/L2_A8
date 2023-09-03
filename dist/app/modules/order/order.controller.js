"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const order = yield order_service_1.OrderService.createOrder(userId, req.body);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Order created successfully',
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error creating order',
            error: error.message,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const orders = yield order_service_1.OrderService.getAllOrders((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId, (_c = req.user) === null || _c === void 0 ? void 0 : _c.role);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error retrieving orders',
            error: error.message,
        });
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const orderId = req.params.orderId;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId; // Extract user id from token
        const role = (_e = req.user) === null || _e === void 0 ? void 0 : _e.role; // Extract user id from token
        const orders = yield order_service_1.OrderService.getOrderById(orderId, userId, role);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Error retrieving orders',
            error: error.message,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders,
    getOrderById,
};
