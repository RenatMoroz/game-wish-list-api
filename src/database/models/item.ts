import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    background: {
      type: String,
      default: 'white',
    },
    status: {
      type: String,
      enum: ['planned', 'playing', 'completed'],
      default: 'planned',
      required: true,
    },
    rating: {
      type: Number,
      default: null,
    },
    hoursPlayed: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categorys',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Item = InferSchemaType<typeof itemSchema>;
export type ItemDocument = HydratedDocument<Item>;

export const ItemCollection = model<Item>('items', itemSchema);
