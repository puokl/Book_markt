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
exports.getCharacter = exports.createCharacter = void 0;
const express_1 = __importDefault(require("express"));
const test_model_1 = require("../models/test.model"); // Adjust the path accordingly
const router = express_1.default.Router();
function createCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, color } = req.body;
            if (!name || !color) {
                return res
                    .status(400)
                    .json({ message: "Both name and color are required." });
            }
            const newCharacter = yield test_model_1.Character.create({ name, color });
            return res.status(201).json(newCharacter);
        }
        catch (error) {
            console.error("Error creating character:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    });
}
exports.createCharacter = createCharacter;
// export async function getCharacter(req: Request, res: Response) {
//   try {
//     const characters = await Character.find();
//     return res.status(200).json(characters);
//   } catch (error) {
//     console.error("Error fetching characters:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// }
function getCharacter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Attempting to fetch characters...");
            const characters = yield test_model_1.Character.find();
            console.log("Characters fetched successfully.");
            return res.status(200).json(characters);
        }
        catch (error) {
            console.error("Error fetching characters:", error);
            // Check if the error is related to the MongoDB connection
            if (error.name === "MongoNetworkError") {
                return res.status(500).json({ message: "MongoDB connection error." });
            }
            return res.status(500).json({ message: "Internal server error." });
        }
    });
}
exports.getCharacter = getCharacter;
//# sourceMappingURL=test.controller.js.map