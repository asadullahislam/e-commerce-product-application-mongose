import { Schema, model } from "mongoose";
import { Inventory, Product, Variants } from "./product.interface";

export const VariantsSchema = new Schema<Variants>({
  type: {
    type: String,
    required: [true, "type is required"],
  },
  value: {
    type: String,
    required: [true, "value is required"],
  },
});

export const InventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,

    required: [true, "quantity is required"],
  },
  inStock: {
    type: Boolean,
    required: [true, "inStock is required"],
  },
});

const ProductSchema: Schema = new Schema({
  name: {
    type: String,

    required: [true, "Name is required"],
  },

  description: {
    type: String,

    required: [true, "description is required"],
  },

  price: {
    type: Number,

    required: [true, "price is required"],
  },
  category: {
    type: String,

    required: [true, "category is required"],
  },
  tags: {
    type: [String],

    required: [true, "tags is required"],
  },
  variants: {
    type: [VariantsSchema],

    required: [true, "variants is required"],
  },
  inventory: {
    type: InventorySchema,

    required: [true, "inventory is required"],
  },
});

export const ProductModel = model<Product>("Product", ProductSchema);
