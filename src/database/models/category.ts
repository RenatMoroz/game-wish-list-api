import { HydratedDocument, InferSchemaType, Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    background: {
      type: String,
      default: 'black',
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

export type Category = InferSchemaType<typeof categorySchema>;
export type CategoryDocument = HydratedDocument<Category>;

export const CategoryCollection = model<Category>('categorys', categorySchema);
