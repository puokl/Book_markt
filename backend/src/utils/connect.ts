import mongoose from "mongoose";
import logger from "./logger";

async function connect() {
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
