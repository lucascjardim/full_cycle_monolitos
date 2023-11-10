import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  
  async add(product:Product):Promise<void>{
    try{
      await ProductModel.create({
        id:product.id.id,
        name:product.name,
        description:product.description,
        purchasePrice:product.purchasePrice,
        stock:product.stock,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }catch(e){console.log(e)}
  }

  async find(id:string):Promise<Product>{
    const product = await ProductModel.findOne({ where: {id} });
    if(!product){
      throw new Error(`Product with id ${id} not found`)
    }
    return new Product({
      id:new Id(product.dataValues.id),
      name: product.dataValues.name,
      description: product.dataValues.description,
      purchasePrice: product.dataValues.purchasePrice,
      stock: product.dataValues.stock,
      createdAt: product.dataValues.createdAt,
      updatedAt: product.dataValues.updatedAt,
    });
  }

}