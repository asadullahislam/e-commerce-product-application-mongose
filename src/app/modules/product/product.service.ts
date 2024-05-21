import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findById({ _id });
  return result;
};

//its not working , why not working ???
// const updateSingleProductFromDB = async (productId, updateData, z) => {
//   const result = await ProductModel.findOneAndUpdate(productId, updateData, z);
//   return result;
// };

export default {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
