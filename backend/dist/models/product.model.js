"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789", 10);
const productSchema = new mongoose_1.default.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`,
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    author: { type: String, requiredì: true },
    condition: { type: String, required: true },
    language: { type: String, required: true },
    image: { type: String, required: false },
    pages: { type: Number, required: true },
    year: { type: Number, required: true },
    location: { type: String, required: false },
}, { timestamps: true });
const ProductModel = mongoose_1.default.model("Product", productSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map