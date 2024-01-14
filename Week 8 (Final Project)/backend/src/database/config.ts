import { DataSource } from "typeorm";
import config from "../configs";
const db = config.database;

const database = new DataSource({
  type: "postgres",
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.database,
  synchronize: true,
  logging: ["error","log","warn"],
  entities: ["src/models/*.ts"],
});

export default database;
