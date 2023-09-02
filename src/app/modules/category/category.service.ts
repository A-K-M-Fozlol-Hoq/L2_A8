import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICategory, ICategoryFilterRequest } from './category.interface';

const createCategory = async (category: ICategory): Promise<ICategory> => {
  const result = await prisma.category.create({
    data: category,
  });
  return result;
};

const getAllCategories = async (
  filters: ICategoryFilterRequest
): Promise<ICategory[]> => {
  const { title } = filters;
  const whereConditions: Prisma.CategoryWhereInput = {};

  if (title) {
    whereConditions.title = {
      contains: title,
      mode: 'insensitive',
    };
  }

  const result = await prisma.category.findMany({
    where: whereConditions,
  });
  return result;
};

const getCategoryById = async (id: string): Promise<ICategory | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateCategory = async (
  id: string,
  categoryData: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: categoryData,
  });
  return result;
};

const deleteCategory = async (id: string): Promise<ICategory | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
