import { Category, Prisma, Book as PrismaBook } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IBook, IBookFilterRequest } from './book.interface';

// Function to map a PrismaBook to an IBook
const mapPrismaBookToIBook = async (
  book: PrismaBook,
  prisma: any
): Promise<IBook> => {
  // Fetch the associated category
  const category: Category | null = await prisma.category.findUnique({
    where: {
      id: book.categoryId,
    },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    price: book.price,
    publicationDate: book.publicationDate.toISOString(),
    categoryId: book.categoryId,
    // category: {
    //   id: category.id,
    //   title: category.title,
    // },
  };
};

const createBook = async (book: IBook): Promise<IBook> => {
  const result = await prisma.book.create({
    data: book,
  });
  return mapPrismaBookToIBook(result, prisma);
};

const getAllBooks = async (filters: IBookFilterRequest): Promise<IBook[]> => {
  const { title, author, genre } = filters;
  const whereConditions: Prisma.BookWhereInput = {};

  if (title) {
    whereConditions.title = {
      contains: title,
      mode: 'insensitive',
    };
  }

  if (author) {
    whereConditions.author = {
      contains: author,
      mode: 'insensitive',
    };
  }

  if (genre) {
    whereConditions.genre = {
      contains: genre,
      mode: 'insensitive',
    };
  }

  const books: PrismaBook[] = await prisma.book.findMany({
    where: whereConditions,
    include: {
      category: true,
    },
  });

  return Promise.all(books.map(book => mapPrismaBookToIBook(book, prisma)));
};

const getBooksByCategoryId = async (
  categoryId: string,
  page: number,
  size: number
): Promise<IBook[]> => {
  const books: PrismaBook[] = await prisma.book.findMany({
    where: {
      categoryId,
    },
    take: size,
    skip: (page - 1) * size,
    include: {
      category: true,
    },
  });

  return Promise.all(books.map(book => mapPrismaBookToIBook(book, prisma)));
};

const getBookById = async (id: string): Promise<IBook | null> => {
  const book: PrismaBook | null = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!book) {
    return null;
  }

  return mapPrismaBookToIBook(book, prisma);
};

const updateBook = async (
  id: string,
  bookData: Partial<IBook>
): Promise<IBook | null> => {
  const book: PrismaBook | null = await prisma.book.update({
    where: {
      id,
    },
    data: bookData,
    include: {
      category: true,
    },
  });

  if (!book) {
    return null;
  }

  return mapPrismaBookToIBook(book, prisma);
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const book: PrismaBook | null = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  if (!book) {
    return null;
  }

  return mapPrismaBookToIBook(book, prisma);
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getBookById,
  updateBook,
  deleteBook,
};
