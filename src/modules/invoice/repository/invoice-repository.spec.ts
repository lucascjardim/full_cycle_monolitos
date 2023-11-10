import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import Address from "../domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice-repository";

describe("invoice repository test",() => {
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

  it("should generate a invoice", async() => {
    const item1 = new InvoiceItem({
      id:new Id("100"),
      name:"item1",
      price:120,
      quantity:1,
    });
  
    const item2 = new InvoiceItem({
      id:new Id("101"),
      name:"item2",
      price:178,
      quantity:2,
    });
    const items:InvoiceItem[] = [item1, item2];
    const invoice = new Invoice({
      id:new Id("120"),
      name:"Invoice 01",
      document:"NF01",
      items:items,
    });
    const address = new Address({
      street: "Rua A",
      number: 144 ,
      complement: "Loja 1",
      city: "Sampa",
      state: "SP",
      zipCode: "102050",
    });
    invoice.setAddress(address);
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(invoice);
    const invoiceDb = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include:'items',
    });
    expect(invoiceDb.dataValues.id).toBe(invoice.id.id);
    expect(invoice.document).toEqual(invoiceDb.dataValues.document);
    expect(invoice.address.street).toEqual(invoiceDb.dataValues.street);
    expect(invoice.address.number).toEqual(invoiceDb.dataValues.number);
    expect(invoice.address.state).toEqual(invoiceDb.dataValues.state);
    expect(invoice.address.zipCode).toEqual(invoiceDb.dataValues.zipCode);
    expect(invoice.address.complement).toEqual(invoiceDb.dataValues.complement);
    expect(invoice.total).toEqual(invoiceDb.dataValues.total);
    expect(invoiceDb.dataValues.items[0].dataValues.id).toBe(invoice.items[0].id.id);
    expect(invoiceDb.dataValues.items[0].dataValues.name).toBe(invoice.items[0].name);
    expect(invoiceDb.dataValues.items[0].dataValues.price).toBe(invoice.items[0].price);
    expect(invoiceDb.dataValues.items[0].dataValues.quantity).toBe(invoice.items[0].quantity);
    expect(invoiceDb.dataValues.items[0].dataValues.subtotal).toBe(invoice.items[0].subtotal);


  });
});