import dotenv from "dotenv";

// Load environment variables from a .env file (if present)
dotenv.config();

// Configuration object
const config = {
  // Server configuration
  serverPort: process.env.PORT || 5005, // Use the specified port or default to 5005

  // Database configuration
  database: {
    host: process.env.DATABASE_HOST, // Database host address
    port: +process.env.DATABASE_PORT!, // Convert string to number (non-null assertion)
    user: process.env.DATABASE_USER, // Database username
    password: process.env.DATABASE_PASSWORD, // Database password
    database: process.env.DATABASE_NAME, // Database name
  },

  // JSON Web Token (JWT) configuration
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET_KEY!, // Access token secret key
    refreshSecret: process.env.JWT_REFRESH_SECRET_KEY!, // Refresh token secret key
  },
};

// Export the configuration object
export default config;
