import AddProductUseCase from "./add-product.usecase";

describe("add product usecase unit test", () => {
  it("should add a product", async() => {
    const MockRepository = () => {
      return {
        add:jest.fn(),
        find:jest.fn(),
      }
    }
    const input = {
      name:"product",
      description:"product description",
      purchasePrice:100,
      stock:10,
    }
    const productRepository = MockRepository();
    const addProductUsecase = new AddProductUseCase(productRepository);
    const result = await addProductUsecase.execute(input);
    expect(productRepository.add).toHaveBeenCalled;
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.purchasePrice).toBe(input.purchasePrice);
    expect(result.stock).toBe(input.stock);
  });
});