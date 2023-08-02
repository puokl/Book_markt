"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserProductHandler = exports.getAllProductHandler = exports.deleteProductHandler = exports.getProductHandler = exports.updateProductHandler = exports.createProductHandler = void 0;
const product_service_1 = require("../service/product.service");
// @desc    Create a single product
// @route   POST /api/products/
// @access  Private
function createProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = res.locals.user._id;
        const userName = res.locals.user.name;
        const body = req.body;
        const product = yield (0, product_service_1.createProduct)(Object.assign(Object.assign({}, body), { userId: userID, username: userName }));
        console.log("product", product);
        return res.send(product);
    });
}
exports.createProductHandler = createProductHandler;
// @desc    Update a single product
// @route   PUT /api/products/:productId
// @access  Private
function updateProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = res.locals.user._id;
            const productId = req.params.productId;
            const update = req.body;
            const product = yield (0, product_service_1.findProduct)({ productId });
            if (!product) {
                return res.sendStatus(404);
            }
            if (String(product.userId) !== userID) {
                return res.sendStatus(403);
            }
            const updatedProduct = yield (0, product_service_1.findAndupdateProduct)({ productId }, update, {
                new: true,
            });
            return res.send(updatedProduct);
        }
        catch (error) {
            console.log("error in product.controller", error);
        }
    });
}
exports.updateProductHandler = updateProductHandler;
// @desc    Get a single product
// @route   GET /api/products/:productId
// @access  Public
function getProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const productId = req.params.productId;
        const product = yield (0, product_service_1.findProduct)({ productId });
        if (!product) {
            return res.sendStatus(404);
        }
        return res.send(product);
    });
}
exports.getProductHandler = getProductHandler;
// @desc    Delete a single product
// @route   DELETE /api/products/:productId
// @access  Private
function deleteProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const productId = req.params.productId;
        const product = yield (0, product_service_1.findProduct)({ productId });
        if (!product) {
            console.log("cannot find the product");
            return res.sendStatus(404);
        }
        if (String(product.userId) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, product_service_1.deleteProduct)({ productId });
        return res.sendStatus(200);
    });
}
exports.deleteProductHandler = deleteProductHandler;
//SECTION -
// @desc    Get all products
// @route   GET /api/products
// @access  Public
function getAllProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield (0, product_service_1.findAllProduct)();
        if (!product) {
            return res.sendStatus(404);
        }
        return res.send(product);
    });
}
exports.getAllProductHandler = getAllProductHandler;
// @desc    Get all products from User
// @route   GET /api/userproducts
// @access  Public
function getAllUserProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = res.locals.user._id;
            const product = yield (0, product_service_1.findAllUserProduct)(userId);
            if (!product) {
                return res.sendStatus(404);
            }
            return res.send(product);
        }
        catch (error) {
            console.log("error on getAllUserProductHandler", error);
        }
    });
}
exports.getAllUserProductHandler = getAllUserProductHandler;
//# sourceMappingURL=product.controller.js.map