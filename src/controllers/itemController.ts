import { RequestHandler } from 'express';
import { CreateItem, UpdateItem } from '../types/item.js';
import { UserDocument } from '../database/models/user.js';
import * as itemServices from '../services/itemServices.js';
import createHttpError from 'http-errors';

export const createItemCategory: RequestHandler = async (req, res, next) => {
  const body = req.body as CreateItem;
  const user = req.user as UserDocument;
  if (user) {
    body.userId = user._id.toString();
  }
  const item = await itemServices.createItemCategory(body);
  return res.status(201).json(item);
};

export const getItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const filters = req.params;
    const user = req.user as UserDocument;
    if (!user) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const item = await itemServices.getItemCategory(filters, user._id);
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const getItemCategoryId: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;
    const { itemCategoryId } = req.params;
    if (!user) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const item = await itemServices.getItemCategoryId(itemCategoryId, user._id);
    if (!item) {
      return next(createHttpError(404, 'Item not found'));
    }
    return res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;
    const { itemCategoryId } = req.params;
    const body = req.body as UpdateItem;
    if (!user) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const updateItem = await itemServices.updateItemCategory(
      itemCategoryId,
      user._id,
      body,
    );
    if (!updateItem) {
      return next(createHttpError(404, 'Item not found'));
    }
    res.status(200).json(updateItem);
  } catch (error) {
    next(error);
  }
};

export const deleteItemCategory: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user as UserDocument;
    const { itemCategoryId } = req.params;

    if (!user) {
      return next(createHttpError(401, 'Unauthorized'));
    }
    const deleteItem = await itemServices.deleteItemCategory(
      itemCategoryId,
      user._id,
    );
    if (!deleteItem) {
      return next(createHttpError(404, 'Item not found'));
    }
    res.status(200).json({ message: 'Item deleted successfully', deleteItem });
  } catch (error) {}
};
