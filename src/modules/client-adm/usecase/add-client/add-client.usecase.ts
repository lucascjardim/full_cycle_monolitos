import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase {
  private _clientRepository:ClientGateway;
  constructor(clientRepository:ClientGateway){
    this._clientRepository = clientRepository;
  }

  async execute(input:AddClientInputDto):Promise<AddClientOutputDto>{
    const props = {
      id:new Id(input.id) || new Id(),
      name:input.name,
      email:input.email,
      street:input.street,
      city:input.city,
      state:input.state,
      number:input.number,
      document:input.document,
      complement:input.complement,
      zipCode:input.zipCode,
    }

    const client = new Client(props);
    this._clientRepository.add(client);
    return {
      id:client.id.id,
      name:client.name,
      email:client.email,
      street:client.street,
      city:client.city,
      state:client.state,
      number:client.number,
      document:client.document,
      complement:client.complement,
      zipCode:client.zipCode,
      createdAt:client.createdAt,
      updatedAt:client.updatedAt,
    }
  }
}