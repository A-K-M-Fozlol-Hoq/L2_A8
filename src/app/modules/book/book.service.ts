import { Book, Book as PrismaBook } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './book.constants';
import { IBook, IBookFilterRequest } from './book.interface';

const createBook = async (book: IBook): Promise<IBook> => {
  const result = await prisma.book.create({
    data: book,
  });
  return result;
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);

  const { search, minPrice, maxPrice, category } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte: parseInt(minPrice),
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: parseInt(maxPrice),
      },
    });
  }

  if (category !== undefined) {
    andConditions.push({
      categoryId: category,
    });
  }

  const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereCondition,
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {},
  });

  const total = await prisma.book.count();

  return {
    meta: {
      page,
      size,
      total,
    },
    data: result,
  };
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

  return books;
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

  return book;
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

  return book;
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

  return book;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBooksByCategoryId,
  getBookById,
  updateBook,
  deleteBook,
};
