import connect from "./utils/connect";
import logger from "./utils/logger";
import * as dotenv from "dotenv";
import createServer from "./utils/server";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT;
const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
});
