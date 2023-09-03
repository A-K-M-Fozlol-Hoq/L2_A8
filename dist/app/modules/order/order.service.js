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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = exports.createOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (userId, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: {
            userId,
            orderedBooks: orderedBooks,
        },
    });
    return result;
});
exports.createOrder = createOrder;
const getAllOrders = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === 'customer') {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId,
            },
        });
    }
    if (role === 'admin') {
        result = yield prisma_1.default.order.findMany({});
    }
    console.log(role, result);
    return result;
});
const getOrderById = (orderId, userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id: orderId,
        },
    });
    if (role === 'customer') {
        if ((result === null || result === void 0 ? void 0 : result.userId) !== userId) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not allowed to access this order.');
        }
    }
    return result;
});
exports.OrderService = {
    createOrder: exports.createOrder,
    getAllOrders,
    getOrderById,
};
