import cors from "cors";
import express from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import cookieParser from "cookie-parser";
import cloudinaryConfig from "../config/cloudinary";

function createServer() {
  const app = express();
  app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(deserializeUser); // middleware called on every endpoint on every request
  cloudinaryConfig();
  routes(app);
  console.log("routes", routes);
  return app;
}

export default createServer;
