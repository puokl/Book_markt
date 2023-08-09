"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const deserializeUser_1 = __importDefault(require("../middleware/deserializeUser"));
const routes_1 = __importDefault(require("../routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
function createServer() {
    const app = (0, express_1.default)();
    // app.use(
    //   cors({
    //     origin: process.env.ORIGIN,
    //     credentials: true,
    //   })
    // );
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({
        extended: true,
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(deserializeUser_1.default); // to add the user to the req object
    (0, cloudinary_1.default)();
    (0, routes_1.default)(app);
    console.log("routes", routes_1.default);
    return app;
}
exports.default = createServer;
//# sourceMappingURL=server.js.map