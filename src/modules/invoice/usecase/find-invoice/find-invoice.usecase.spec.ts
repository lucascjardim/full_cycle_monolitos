import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/value-object/address";
import FindInvoiceUseCase from "./find.invoice.usecase";


describe("find invoice usecase unit test", () => {
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
    number:144 ,
    complement: "Loja 1",
    city: "Sampa",
    state: "SP",
    zipCode: "102050",
  });
  invoice.setAddress(address);

  it("should find a invoice", async() => {
    const MockRepository = () => {
      return {
        generate:jest.fn(),
        find:jest.fn().mockReturnValue(Promise.resolve(invoice)),
      }
    }
    const repository = MockRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);
    const result = await findInvoiceUseCase.execute({ id:"120"});
    expect(repository.find).toHaveBeenCalled;
    expect(result.id).toBeDefined;
    expect(result.name).toBe(invoice.name);
    expect(result.address.street).toEqual(address.street);
    expect(result.address.number).toEqual(address.number);
    expect(result.address.complement).toEqual(address.complement);
    expect(result.address.state).toEqual(address.state);
    expect(result.address.city).toEqual(address.city);
    expect(result.address.zipCode).toEqual(address.zipCode);
  });
});