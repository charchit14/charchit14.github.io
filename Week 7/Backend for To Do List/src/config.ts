import dotenv from 'dotenv';

dotenv.config();

const config = {
  serverPort: process.env.SERVER_PORT || 8000,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
  },

  database: {
    charset: 'utf8',
    client: process.env.DB_CLIENT || 'pg',
    database: process.env.DB_NAME || 'node-tasks',
    host: process.env.DB_HOST || '127.0.0.1',
    password: process.env.DB_PASSWORD || 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
    timezone: 'UTC',
    user: process.env.DB_USER || 'postgres',
  },
};

export default config;
