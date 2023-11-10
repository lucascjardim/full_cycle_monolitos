import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/value-object/address";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

describe("generate invoice usecase unit test", () => {
  const items = [{
    id:new Id("100"),
    name:"item1",
    price:120,
    quantity:1,
  }, {
    id:new Id("101"),
    name:"item2",
    price:178,
    quantity:2,
  }];
  const input = {
    id:new Id("120"),
    name:"Invoice 01",
    document:"NF01",
    street: "Rua A",
    number:144 ,
    complement: "Loja 1",
    city: "Sampa",
    state: "SP",
    zipCode: "102050",
    items:items,
  }

  it("should generate a invoice", async() => {
    const MockRepository = () => {
      return {
        generate:jest.fn(),
        find:jest.fn(),
      }
    }
    const repository = MockRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const result = await generateInvoiceUseCase.execute(input);
    console.log(result.items)
    expect(repository.generate).toHaveBeenCalled;
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.state).toEqual(input.state);
    expect(result.city).toEqual(input.city);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items[0].quantity).toEqual(input.items[0].quantity);
    expect(result.items[0].name).toEqual(input.items[0].name);
    expect(result.items[0].price).toEqual(input.items[0].price);
    expect(input.items[0].price * result.items[0].quantity).toEqual(result.items[0].subtotal);
    expect(result.items[1].quantity).toEqual(input.items[1].quantity);
    expect(result.items[1].name).toEqual(input.items[1].name);
    expect(result.items[1].price).toEqual(input.items[1].price);
    expect(input.items[1].price * result.items[1].quantity).toEqual(result.items[1].subtotal);


  });
});