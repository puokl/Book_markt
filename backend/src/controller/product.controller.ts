import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAllProduct,
  findAndupdateProduct,
  findProduct,
} from "../service/product.service";

// @desc    Create a single product
// @route   POST /api/products/
// @access  Private
export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const body = req.body;
  const product = await createProduct({ ...body, user: userId });
  return res.send(product);
}

// @desc    Update a single product
// @route   PUT /api/products/:productId
// @access  Private
export async function updateProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;
  const update = req.body;

  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProduct = await findAndupdateProduct({ productId }, update, {
    new: true,
  });
  return res.send(updatedProduct);
}

// @desc    Get a single product
// @route   GET /api/products/:productId
// @access  Public
export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const productId = req.params.productId;
  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}

// @desc    Delete a single product
// @route   DELETE /api/products/:productId
// @access  Private
export async function deleteProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  const product = await findProduct({ productId });

  if (!product) {
    return res.sendStatus(404);
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProduct({ productId });

  return res.sendStatus(200);
}

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export async function getAllProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  const product = await findAllProduct();

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
}
