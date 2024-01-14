import dbConfig from "./config";
import logger from "../utils/logger";
const connection = async () => {
  try {
    await dbConfig.initialize();
    logger.info("Database is connected !!");
  } catch (error) {
    logger.error("Database connection error !!");
    logger.error(error);
  }
};
export default connection;
