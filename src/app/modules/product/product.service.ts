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

const deleteProduct = async (_id: string) => {
  const result = await ProductModel.findByIdAndDelete({ _id });
  return result;
};

const queryProductByName = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const result = ProductModel.find({ name: regex });
  return result;
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteProduct,
  queryProductByName,
};
