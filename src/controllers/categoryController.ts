import { RequestHandler } from 'express';
import * as categoryServices from '../services/categoryService.js';
import { CreateCategory, UpdateCategory } from '../types/category.js';
import { UserDocument } from '../database/models/user.js';
import createHttpError from 'http-errors';

export const createGameWishListCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  const body = req.body as CreateCategory;
  const user = req.user as UserDocument;
  if (user?._id) {
    body.userId = user._id.toString();
  }
  const item = await categoryServices.createGameWishListCategory(body);
  return res.status(201).json(item);
};

export const getGameWishListCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const user = req.user as UserDocument;
    const filters = req.query;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const category = await categoryServices.getGameWishListCategory(
      filters,
      user._id,
    );
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const getGameWishListCategoryId: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { categoryId } = req.params;
    const user = req.user as UserDocument;
    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const category = await categoryServices.getGameWishListCategoryId(
      categoryId,
      user._id,
    );
    if (!category) {
      return next(createHttpError(404, 'Category not found'));
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateGameWishListCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { categoryId } = req.params;
    const user = req.user as UserDocument;
    const body = req.body as UpdateCategory;

    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const category = await categoryServices.updateGameWishListCategory(
      categoryId,
      user._id,
      body,
    );
    if (!category) {
      return next(createHttpError(404, 'Category not found'));
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteGameWishListCategory: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { categoryId } = req.params;
    const user = req.user as UserDocument;
    if (!user?._id) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const deleteCategory = await categoryServices.deleteGameWishListCategory(
      categoryId,
      user._id,
    );
    if (!deleteCategory) {
      return next(createHttpError(404, 'Category not found'));
    }
    res
      .status(200)
      .json({ message: 'Category deleted successfully', deleteCategory });
  } catch (error) {
    next(error);
  }
};
