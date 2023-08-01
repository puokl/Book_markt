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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductHandler = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
function searchProductHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title } = req.query;
            const agg = [
                {
                    $search: {
                        autocomplete: {
                            query: title,
                            path: "title",
                            fuzzy: {
                                maxEdits: 2,
                            },
                        },
                    },
                },
                {
                    $limit: 10,
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        author: 1,
                        image: "$image",
                        location: "$location",
                        price: "$price",
                        productId: 1,
                    },
                },
            ];
            const response = yield product_model_1.default.aggregate(agg);
            return res.json(response);
        }
        catch (error) {
            console.log("Error in searchProductHandler", error);
            return res.json([]);
        }
    });
}
exports.searchProductHandler = searchProductHandler;
//# sourceMappingURL=search.controller.js.map