import { Types } from 'mongoose';
import { ItemCollection } from '../database/models/item.js';
import { CreateItem, GetItemsParams, UpdateItem } from '../types/item.js';

export const createItemCategory = async (body: CreateItem) => {
  const item = await ItemCollection.create(body);
  return item;
};

export const getItemCategory = async (
  params: GetItemsParams,
  userId: Types.ObjectId,
) => {
  const query: GetItemsParams = {
    userId: userId.toString(),
  };
  if (params.title) {
    query.title = params.title;
  }
  if (params.description) {
    query.description = params.description;
  }
  if (params.background) {
    query.background = params.background;
  }
  if (params.status) {
    query.status = params.status;
  }
  if (params.rating) {
    query.rating = params.rating;
  }
  if (params.hoursPlayed) {
    query.hoursPlayed = params.hoursPlayed;
  }
  if (params.categoryId) {
    query.categoryId = params.categoryId;
  }
  const item = await ItemCollection.find(query);
  return item;
};

export const getItemCategoryId = async (
  itemCategoryId: string,
  userId: Types.ObjectId,
) => {
  const item = await ItemCollection.findOne({
    _id: itemCategoryId,
    userId: userId._id.toString(),
  });
  return item;
};

export const updateItemCategory = async (
  itemCategoryId: string,
  userId: Types.ObjectId,
  body: UpdateItem,
) => {
  const item = await ItemCollection.findOne({
    _id: itemCategoryId,
    userId: userId._id.toString(),
  });
  if (!item) {
    return null;
  }
  if (body.title !== undefined) item.title = body.title;
  if (body.description !== undefined) item.description = body.description;
  if (body.background !== undefined) item.background = body.background;
  if (body.status !== undefined) item.status = body.status;
  if (body.rating !== undefined) item.rating = body.rating;
  if (body.hoursPlayed !== undefined) item.hoursPlayed = body.hoursPlayed;
  await item.save();
  return item;
};

export const deleteItemCategory = async (
  itemCategoryId: string,
  userId: Types.ObjectId,
) => {
  const item = await ItemCollection.findOneAndDelete({
    _id: itemCategoryId,
    userId: userId._id.toString(),
  });
  return item;
};
