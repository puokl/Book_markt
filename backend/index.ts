import logger from "./src/utils/logger";
import * as dotenv from "dotenv";
import createServer from "./src/utils/server";
import connect from "./src/utils/connect";

dotenv.config({ path: __dirname + "/.env" });

const port = process.env.PORT;
const app = createServer();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();
});
