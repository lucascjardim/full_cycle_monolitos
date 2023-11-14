import express, { Express } from "express"
import { Sequelize } from "sequelize-typescript";
import path from "path";
import { clientRoute } from "./routes/client.route";
import { ClientModel } from "../client-adm/repository/client.model";

export const app: Express = express();
app.use(express.json());
app.use("/customer", clientRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect:'sqlite',
    host: path.join(__dirname, '../../../../db.sqlite'),
    logging:false,
  });
  
  sequelize.addModels([ClientModel]);
  await sequelize.sync();
}

setupDb();