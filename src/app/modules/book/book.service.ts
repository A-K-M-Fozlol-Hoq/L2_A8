import { Prisma, Book as PrismaBook } from '@prisma/client';
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
): Promise<IGenericResponse<IBook[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // if (title) {
  //   whereConditions.title = {
  //     contains: title,
  //     mode: 'insensitive',
  //   };
  // }

  // if (author) {
  //   whereConditions.author = {
  //     contains: author,
  //     mode: 'insensitive',
  //   };
  // }

  // if (genre) {
  //   whereConditions.genre = {
  //     contains: genre,
  //     mode: 'insensitive',
  //   };
  // }

  // if (minPrice !== undefined && maxPrice !== undefined) {
  //   whereConditions.price = {
  //     gte: minPrice,
  //     lte: maxPrice,
  //   };
  // } else if (minPrice !== undefined) {
  //   whereConditions.price = {
  //     gte: minPrice,
  //   };
  // } else if (maxPrice !== undefined) {
  //   whereConditions.price = {
  //     lte: maxPrice,
  //   };
  // }

  // if (category) {
  //   whereConditions.categoryId = category;
  // }

  const books: PrismaBook[] = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {},
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: books,
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
