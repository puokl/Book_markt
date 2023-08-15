"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./controller/user.controller");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const user_schema_1 = require("./schema/user.schema");
const session_controller_1 = require("./controller/session.controller");
const session_schema_1 = require("./schema/session.schema");
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
const product_schema_1 = require("./schema/product.schema");
const product_controller_1 = require("./controller/product.controller");
const chat_controller_1 = require("./controller/chat.controller");
const image_controller_1 = require("./controller/image.controller");
const multerMiddleware_1 = __importDefault(require("./middleware/multerMiddleware"));
const search_controller_1 = require("./controller/search.controller");
// responsible to take the http request and forwarding it on to a controller
function routes(app) {
    app.options("*", (req, res) => {
        console.log("Preflight Request Headers:", req.headers);
        res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.sendStatus(200);
    });
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    //NOTE - USERS
    app.get("/api/me", requireUser_1.default, user_controller_1.getCurrentUser);
    app.post("/api/users", (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.put("/api/users/:userId", 
    // validateResource(updateUserSchema),
    user_controller_1.updateUserHandler);
    //NOTE - IMAGE
    app.post("/api/imageUpload", 
    // requireUser,
    multerMiddleware_1.default.single("image"), image_controller_1.uploadImageHandler);
    //NOTE - SESSIONS
    app.get("/api/sessions", requireUser_1.default, session_controller_1.getUserSessionHandler);
    app.get("/api/sessions/oauth/google", session_controller_1.googleOauthHandler);
    app.post("/api/sessions", (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.delete("/api/sessions", requireUser_1.default, session_controller_1.deleteSessionHandler);
    app.get("/api/sessions/getLog", requireUser_1.default, user_controller_1.getLog);
    //NOTE - PRODUCTS
    app.get("/api/products/:productId", (0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler);
    app.post("/api/products", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    app.put("/api/products/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.delete("/api/products/:productId", [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
    app.get("/api/products", product_controller_1.getAllProductHandler);
    app.get("/api/userproducts", requireUser_1.default, product_controller_1.getAllUserProductHandler);
    //NOTE - CHAT
    app.post("/api/chat", requireUser_1.default, chat_controller_1.createChatHandler);
    app.get("/api/chat/received", requireUser_1.default, chat_controller_1.getAllUserChatHandler);
    app.get("/api/chat/sent", requireUser_1.default, chat_controller_1.getAllUserSentChatHandler);
    app.post("/api/chat/:chatId", requireUser_1.default, chat_controller_1.addConversationHandler);
    app.get("/api/search", search_controller_1.searchProductHandler);
}
exports.default = routes;
//# sourceMappingURL=routes.js.map