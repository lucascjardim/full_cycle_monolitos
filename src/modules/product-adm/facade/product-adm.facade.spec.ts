import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";

describe("Product adm facade test", () => {
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

  it("should create an product", async() => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id:"1",
      name:"Product 1",
      description: "Product 1 description",
      purchasePrice:10,
      stock: 10,
    };
    await productFacade.addProduct(input);
    const product = await ProductModel.findOne({ where: {id:input.id }});
    expect(product.dataValues.id).toEqual(input.id);
    expect(product.dataValues.name).toEqual(input.name);
    expect(product.dataValues.description).toEqual(input.description);
    expect(product.dataValues.stock).toEqual(input.stock);
    expect(product.dataValues.purchasePrice).toEqual(input.purchasePrice);
  });
});