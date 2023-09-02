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
  title?: string | undefined;
  author?: string | undefined;
  genre?: string | undefined;
};
