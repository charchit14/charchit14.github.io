import { DataSource } from "typeorm";
import config from "../configs";

// Extract database configuration from the global config file
const db = config.database;

// Create a DataSource instance with the specified database configuration
const database = new DataSource({
  type: "postgres",         // Database type (PostgreSQL in this case)
  host: db.host,            // Database host address
  port: db.port,            // Database port
  username: db.user,        // Database username
  password: db.password,    // Database password
  database: db.database,    // Database name
  synchronize: true,        // Automatically synchronize database schema with entities
  logging: ["error", "log", "warn"],  // Specify which types of logs to output
  entities: ["src/models/*.ts"],     // Paths to the entity files (TypeScript)
});

export default database;
