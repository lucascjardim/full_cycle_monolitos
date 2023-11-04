import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
  private _productRepository:ProductGateway;
  constructor(productRepository:ProductGateway){
    this._productRepository = productRepository;
  }

  async execute(input:CheckStockInputDto):Promise<CheckStockOutputDto>{
    try{
      const props = {
        productId:input.productId
      }

      const stockProduct = await this._productRepository.find(props.productId);
      return {
        productId: stockProduct.id.id,
        stock:stockProduct.stock,
      }
    }catch(e){console.log(e)}
    }
}