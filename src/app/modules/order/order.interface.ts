// order.interface.ts
export type IOrder = {
  id: string;
  userId: string;
  orderedBooks: IOrderedBook[];
  status: string;
  createdAt: Date;
};

export type IOrderedBook = {
  bookId: string;
  quantity: number;
};
