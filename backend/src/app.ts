import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });
// const port = config.get<number>("port");
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(deserializeUser); // middleware called on every endpoint on every request

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
  routes(app);
});
