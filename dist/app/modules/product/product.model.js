"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.InventorySchema = exports.VariantsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.VariantsSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
});
exports.InventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [exports.VariantsSchema], required: true },
    inventory: { type: exports.InventorySchema, required: true },
});
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
