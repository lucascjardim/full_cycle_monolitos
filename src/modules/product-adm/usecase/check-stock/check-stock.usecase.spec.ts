import CheckStockUseCase from "./check-stock.usecase";
import Product from "../../domain/product.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";


const input = {
  id:"1515",
  name:"product",
  description:"product description",
  purchasePrice:100,
  stock:10,
  createdAt:new Date(),
  updatedAt:new Date(),
}

const MockRepository = () => {
  return {
    add:jest.fn(),
    find:jest.fn().mockReturnValue(
      Promise.resolve(new Product({
        id:new Id(input.id),
        name: input.name,
        description: input.description,
        purchasePrice: input.purchasePrice,
        stock: input.stock,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
      }))
    ),
  }
}

describe("check stock use case unit test", () => {
  
  it("should consult stock an product", async() => {
    const productRepository = MockRepository();
    const usecase = new CheckStockUseCase(productRepository);
    const result = await usecase.execute({productId:input.id});
    expect(result.productId).toBeDefined;
    expect(result.stock).toBe(input.stock);
    expect(productRepository.find).toHaveBeenCalled();
  });
});