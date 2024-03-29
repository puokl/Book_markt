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
    //SECTION -
    const allowlist = ["https://marktbook.vercel.app", "http://localhost:5173"];
    const corsOptionsDelegate = function (req, callback) {
        var corsOptions;
        if (allowlist.indexOf(req.header("Origin")) !== -1) {
            console.log("inside allowlistr.index");
            corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
        }
        else {
            console.log("inside corsoptions false");
            corsOptions = { origin: false }; // disable CORS for this request
        }
        callback(null, corsOptions); // callback expects two parameters: error and options
    };
    //SECTION -
    app.use((0, cors_1.default)({
        origin: process.env.ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }));
    // app.use(cors(corsOptionsDelegate));
    // app.use(cors({ credentials: true }));
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