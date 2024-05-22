import { Request, Response } from "express";

import { ProductModel } from "./product.model";
import { ProductServices } from "./product.service";
import ProductValidationSchema from "./product.validation.zod";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const zodParsedProductData = ProductValidationSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(
      zodParsedProductData
    );

    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product is not created successfully",
      error: error,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDB();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product is not fatched successfully",
      error: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product is not fatched successfully",
      error: error,
    });
  }
};
//update document
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const updateProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!updateProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updateData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error,
    });
  }
};

//delete document
const deleteOneProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProduct(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product delete is notsuccessfully",
      error: error,
    });
  }
};

// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const { searchItem } = req.query;
//     if (searchItem || typeof searchItem !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing search term",
//       });
//     }

//     const result = await productService.deleteProduct(productId);

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully!",
//       data: null,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Product delete is notsuccessfully",
//       error: error,
//     });
//   }
// };

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteOneProduct,
};
