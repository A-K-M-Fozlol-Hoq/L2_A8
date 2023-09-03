export type IBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  publicationDate: string;
  categoryId: string;
};

export type IBookFilterRequest = {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
};
