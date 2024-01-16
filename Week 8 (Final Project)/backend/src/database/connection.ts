import dbConfig from "./config";  // Import the database configuration
import logger from "../utils/logger";  // Import the logger utility

// Define an asynchronous function to establish a database connection
const connection = async () => {
  try {
    // Initialize the database using the configuration
    await dbConfig.initialize();

    // Log a success message when the database connection is established
    logger.info("Database successfully connected");
  } catch (error) {
    // Log an error message if there is an issue with the database connection
    logger.error("Database connection error");
    
    // Log the specific error details for debugging purposes
    logger.error(error);
  }
};

// Export the connection function for use in other modules
export default connection;
