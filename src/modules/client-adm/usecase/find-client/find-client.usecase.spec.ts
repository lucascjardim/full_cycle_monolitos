import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const client = new Client({
  id:new Id("1"),
  name:"Client 1",
  email: "client@x.com",
  street:"street",
  city:"City",
  state:"ES",
  number:"10A",
  document:"102020",
  complement:"Address 1",
  zipCode:"29890-000",
})

const MockRepository = () => {
  return {
    add:jest.fn(),
    find:jest.fn().mockReturnValue(Promise.resolve(client)),
  }
}


describe("Find client usecase unit test", () => {
  it("should find a client", async() => {
    const clientRepository = MockRepository();
    const usecase = new FindClientUseCase(clientRepository);
    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);
    expect(clientRepository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toBe(client.name);
    expect(result.email).toBe(client.email);
    expect(result.street).toBe(client.street);
    expect(result.createdAt).toBe(client.createdAt);
    expect(result.updatedAt).toBe(client.updatedAt);
  });
});