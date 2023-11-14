import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client repository test",() => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "../../db.sqlite",
      logging:false,
      sync:{ force:true }
    });
    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should be create a client", async() => {
    const client = new Client({
      id:new Id("1"),
      name:"Client 1",
      email:"x@x.com",
      street:"street",
      city:"City",
      state:"ES",
      number:"10A",
      document:"102020",
      complement:"Address 1",
      zipCode:"29890-000",
    });
    const clientRepository = new ClientRepository();
    await clientRepository.add(client);
    const cliendDb = await ClientModel.findOne({where:{ id:"1" }});
    expect(cliendDb).toBeDefined();
    expect(cliendDb.dataValues.id).toBe("1");
    expect(cliendDb.dataValues.name).toBe(client.name);
    expect(cliendDb.dataValues.email).toBe(client.email);
    expect(cliendDb.dataValues.street).toBe(client.street);
    expect(cliendDb.dataValues.updatedAt).toStrictEqual(client.updatedAt);
    expect(cliendDb.dataValues.createdAt).toStrictEqual(client.createdAt);
  });

  it("should find a client", async() => {
    const client = await ClientModel.create({
      id:"1",
      name:"Client 1",
      email:"x@x.com",
      street:"street",
      city:"City",
      state:"ES",
      number:"10A",
      document:"102020",
      complement:"Address 1",
      zipCode:"29890-000",
      createdAt:new Date(),
      updatedAt:new Date(),
    });
    const repository = new ClientRepository();
    const result = await repository.find(client.dataValues.id);
    expect(result.id.id).toEqual(client.dataValues.id);
    expect(result.name).toEqual(client.dataValues.name);
    expect(result.street).toEqual(client.dataValues.street);
    expect(result.updatedAt).toStrictEqual(client.dataValues.updatedAt);
    expect(result.createdAt).toStrictEqual(client.dataValues.createdAt);
  });
});