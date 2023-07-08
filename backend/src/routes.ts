import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getCurrentUser,
  getLog,
  updateUserHandler,
} from "./controller/user.controller";
import { createUser } from "./service/user.service";
import validateResource from "./middleware/validateResource";
import { createUserSchema, updateUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
  googleOauthHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductHandler,
  getProductHandler,
  updateProductHandler,
  getAllUserProductHandler,
} from "./controller/product.controller";
import multer from "multer";
import {
  addConversationHandler,
  createChatHandler,
  getAllUserChatHandler,
  getAllUserSentChatHandler,
} from "./controller/chat.controller";
import { uploadImageHandler } from "./controller/image.controller";
import multerUpload from "./middleware/multerMiddleware";

// responsible to take the http request and forwarding it on to a controller
function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  //NOTE - USERS
  app.get("/api/me", requireUser, getCurrentUser);
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.put(
    "/api/users/:userId",
    // validateResource(updateUserSchema),
    updateUserHandler
  );

  //NOTE - IMAGE
  app.post(
    "/api/imageUpload",
    // requireUser,
    multerUpload.single("image"),
    uploadImageHandler
  );

  //NOTE - SESSIONS
  app.get("/api/sessions", requireUser, getUserSessionHandler);
  app.get("/api/sessions/oauth/google", googleOauthHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get("/api/sessions/getLog", requireUser, getLog);

  //NOTE - PRODUCTS
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );

  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

  app.get("/api/products", getAllProductHandler);

  app.get("/api/userproducts", requireUser, getAllUserProductHandler);

  //NOTE - CHAT
  app.post("/api/chat", requireUser, createChatHandler);
  app.get("/api/chat/received", requireUser, getAllUserChatHandler);
  app.get("/api/chat/sent", requireUser, getAllUserSentChatHandler);
  app.post("/api/chat/:chatId", requireUser, addConversationHandler);
}

export default routes;
