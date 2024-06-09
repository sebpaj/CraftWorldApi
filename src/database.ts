import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected");
  } catch (error) {
    console.log("Not connected", error);
  }
};
export { sequelize, connectDb };
