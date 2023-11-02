import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("product repository test",() => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "../../db.sqlite",
      logging:false,
      sync:{ force:true }
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async() => {
    const productProps = {
      id:new Id("1"),
      name:"product",
      description:"product description",
      purchasePrice:100,
      stock:10,
    }
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);
    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id },
    });
    expect(productDb.dataValues.id).toBe(productProps.id.id);
    expect(productProps.name).toEqual(productDb.dataValues.name);
    expect(productProps.description).toEqual(productDb.dataValues.description);
    expect(productProps.stock).toEqual(productDb.dataValues.stock);
    expect(productProps.purchasePrice).toEqual(productDb.dataValues.purchasePrice);
  });

  it("should find a product", async() => {
    const productRepository = new ProductRepository();
    ProductModel.create({
      id:"1",
      name:"product",
      description:"product description",
      purchasePrice:100,
      stock:10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const product = await productRepository.find("1");
    expect(product.id.id).toBe("1");
    expect(product.name).toEqual("product");
    expect(product.description).toEqual("product description");
    expect(product.stock).toEqual(10);
    expect(product.purchasePrice).toEqual(100);
  });
});