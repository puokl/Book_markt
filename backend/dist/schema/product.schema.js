"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({ required_error: "Title is required" }),
        description: (0, zod_1.string)({ required_error: "Description is required" }).min(10, "Description should be at least 10 characters long"),
        price: (0, zod_1.number)({ required_error: "Price is required" }),
        author: (0, zod_1.string)({ required_error: "Author is required" }),
        condition: (0, zod_1.string)({ required_error: "Condition is required" }),
        language: (0, zod_1.string)({ required_error: "Language is required" }),
        image: (0, zod_1.string)().optional(),
        pages: (0, zod_1.number)({ required_error: "Pages is required" }),
        year: (0, zod_1.number)({ required_error: "Year is required" }),
        userId: (0, zod_1.string)().optional(),
        userName: (0, zod_1.string)().optional(),
        location: (0, zod_1.string)().optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: "productId is required",
        }),
    }),
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateProductSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteProductSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getProductSchema = (0, zod_1.object)(Object.assign({}, params));
//# sourceMappingURL=product.schema.js.map