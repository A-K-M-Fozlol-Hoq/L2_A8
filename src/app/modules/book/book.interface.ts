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
  searchTerm?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  category?: string | undefined;
};
