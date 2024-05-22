import z from "zod";
// Variants Schema
const VariantValidationsSchema = z.object({
  type: z.string().nonempty({ message: "type is required" }),
  value: z.string().nonempty({ message: "value is required" }),
});

// Inventory Schema
const InventoryValidationSchema = z.object({
  quantity: z
    .number()
    .int()
    .min(1, { message: "quantity is required and must be a positive integer" }),
  inStock: z.boolean({ message: "inStock is required" }),
});

// Product Schema
const ProductValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "description is required" }),
  price: z
    .number()
    .min(0.01, { message: "price is required and must be a positive number" }),
  category: z.string().nonempty({ message: "category is required" }),
  tags: z
    .array(z.string().nonempty({ message: "tags must be non-empty strings" }))
    .nonempty({ message: "tags is required" }),
  variants: z
    .array(VariantValidationsSchema)
    .nonempty({ message: "variants is required" }),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
