import "reflect-metadata";

import { DataSource } from "typeorm";
import { env } from "../config/env.js";
import { User } from "../entities/user.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",

  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  entities: [User],

  synchronize: false,

  migrations: ["dist/database/migrations/*.js"],
});
