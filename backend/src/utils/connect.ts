import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
  // const dbUri = config.get<string>("dbUri");
  const dbUri = process.env.MONGO_URI;
  console.log("dburi", dbUri);
  try {
    const conn = await mongoose.connect(dbUri);
    logger.info(`DB Connected to ${conn.connection.host}`);
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;