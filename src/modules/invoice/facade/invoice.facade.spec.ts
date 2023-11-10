import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceRepository from "../repository/invoice-repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import Id from "../../@shared/domain/value-object/id.value-object";
import FindInvoiceUseCase from "../usecase/find-invoice/find.invoice.usecase";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade test",() => {

let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "../../db.sqlite",
      logging:false,
      sync:{ force:true }
    });
    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async() => {
    // const repository = new InvoiceRepository();
    // const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    // const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    // const facade = new InvoiceFacade({
    //   generateInvoiceUseCase:generateInvoiceUseCase,
    //   findInvoiceUseCase:findInvoiceUseCase,
    // });
    const facade = InvoiceFacadeFactory.create();
    const input = {
      id: new Id("1"),
      name: "Invoice test",
      document: "NF55",
      street: "Street A",
      number: 2500,
      complement: "Store A",
      city: "Vitoria",
      state: "ES",
      zipCode: "12999-899",
      items: [{
        id:new Id("10"),
        name:"product teste",
        price: 150,
        quantity:1,
        subtotal:150,
      }],
      total: 150,
    }
    await facade.generate(input);
      
    const clientDb = await InvoiceModel.findOne({ where:{ id:"1" },include:'items' });
    expect(clientDb).toBeDefined();
    expect(clientDb.dataValues.id).toBe(input.id.id);
    expect(clientDb.dataValues.name).toBe(input.name);
    expect(clientDb.dataValues.document).toBe(input.document);
    expect(clientDb.dataValues.total).toBe(input.total);
    expect(clientDb.dataValues.street).toBe(input.street);
    expect(clientDb.dataValues.number).toBe(input.number);
    expect(clientDb.dataValues.complement).toBe(input.complement);
    expect(clientDb.dataValues.city).toBe(input.city);
    expect(clientDb.dataValues.state).toBe(input.state);
    expect(clientDb.dataValues.zipCode).toBe(input.zipCode);
  });

  it("should find a invoice", async() => {
    const facade = InvoiceFacadeFactory.create();
    const input = {
      id: "1",
      name: "Invoice test",
      document: "NF55",
      street: "Street A",
      number: 2500,
      complement: "Store A",
      city: "Vitoria",
      state: "ES",
      zipCode: "12999-899",
      items: [{
        id:"10",
        name:"product teste",
        price: 150,
        quantity:1,
        subtotal:150,
      }],
      total: 150,
      createdAt:new Date(),
      updatedAt:new Date(),
    }
    await InvoiceModel.create(input, { include: 'items' })
    const resultInvoice = await facade.find({ id: "1"});
    expect(resultInvoice.id).toBeDefined();
    expect(resultInvoice.name).toBe(input.name);
    expect(resultInvoice.document).toBe(input.document);
    expect(resultInvoice.address.street).toBe(input.street);
    expect(resultInvoice.address.number).toBe(input.number);
    expect(resultInvoice.address.complement).toBe(input.complement);
    expect(resultInvoice.address.city).toBe(input.city);
    expect(resultInvoice.address.state).toBe(input.state);
    expect(resultInvoice.address.zipCode).toBe(input.zipCode);
    expect(resultInvoice.items.length).toBe(1);
    expect(resultInvoice.items[0].name).toBe(input.items[0].name);
    expect(resultInvoice.items[0].quantity).toBe(input.items[0].quantity);
    expect(resultInvoice.items[0].price).toBe(input.items[0].price);
    expect(resultInvoice.items[0].subtotal).toBe(input.items[0].subtotal);



  });
});