import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find:jest.fn(),
  }
}

describe("Add client usecase unit test", () => {
  it("should add a client", async() => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);
    const input = {
      name: "Client 1",
      email:"x@x.com",
      street:"street",
      city:"City",
      state:"ES",
      number:"10A",
      document:"102020",
      complement:"Address 1",
      zipCode:"29890-000",
    };

    const result = await usecase.execute(input);
    expect(clientRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined;
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.street).toBe(input.street);
  });
});