export interface AddClientFacadeInputDto {
  id?:string;
  name:string;
  email:string;
  street:string;
  number:string;
  city:string;
  state:string;
  zipCode:string;
  document:string;
  complement:string,
}

export interface FindClientFacadeInputDto {
  id:string;
}

export interface FindClientFacadeOutputDto{
  id:string;
  name:string;
  email:string;
  street:string;
  state:string;
  city:string;
  zipCode:string;
  document:string,
  complement:string,
  number:number,
  createdAt:Date;
  updatedAt:Date;
}

export default interface ClientAdmFacadeInterface{
  add(input:AddClientFacadeInputDto):Promise<void>;
  find(input:FindClientFacadeInputDto):Promise<FindClientFacadeOutputDto>;
}