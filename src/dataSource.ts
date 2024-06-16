import "reflect-metadata";
import { DataSource } from "typeorm";
import Material from "./entity/Material";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Material],
  migrations: ["src/migration/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;
