import dotenv from "dotenv";
dotenv.config();

const config = {
  serverPort: process.env.PORT || 5005,
  database: {
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT!,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET_KEY!,
    refreshSecret: process.env.JWT_REFRESH_SECRET_KEY!,
  },
};
export default config;
