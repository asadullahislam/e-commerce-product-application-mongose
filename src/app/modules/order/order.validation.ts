import { z } from "zod";

// Define the Zod schema
const OrderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  productId: z.string().nonempty({ message: "Product ID is required" }),
  price: z.number().min(0.01, { message: "Price must be a positive number" }),
  quantity: z
    .number()
    .int()
    .min(1, { message: "Quantity must be a positive integer" }),
});

export default OrderValidationSchema;
