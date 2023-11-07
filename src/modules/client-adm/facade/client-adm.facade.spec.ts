import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("ClientAdm Facade test",() => {

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

  it("should create an client", async() => {
    // const repository = new ClientRepository();
    // const addUseCase = new AddClientUseCase(repository);
    // const facade = new ClientAdmFacade({
    //   addUseCase:addUseCase,
    //   findUseCase:undefined,
    // });
    const facade = ClientAdmFacadeFactory.create();
    const input = {
      id:"1",
      name:"Client 1",
      email:"x@x.com",
      address:"Address 1"
    }
    await facade.add(input);
    const clientDb = await ClientModel.findOne({ where:{ id:"1" }});
    expect(clientDb).toBeDefined();
    expect(clientDb.dataValues.name).toBe(input.name);
    expect(clientDb.dataValues.email).toBe(input.email);
    expect(clientDb.dataValues.address).toBe(input.address);
  });

  it("should find a client", async() => {
    // const repository = new ClientRepository();
    // const findUseCase = new FindClientUseCase(repository);
    // const addUseCase = new AddClientUseCase(repository);
    // const facade = new ClientAdmFacade({
    //   addUseCase:addUseCase,
    //   findUseCase:findUseCase,
    // });
    const facade = ClientAdmFacadeFactory.create();
    const input = {
      id:"1",
      name:"Client 1",
      email:"x@x.com",
      address:"Address 1"
    }
    await facade.add(input);
    const client = await facade.find({id: input.id});
    expect(client).toBeDefined();
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);

  });
});