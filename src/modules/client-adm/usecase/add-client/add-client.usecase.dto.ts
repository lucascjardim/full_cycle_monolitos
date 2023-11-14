export interface AddClientInputDto {
  id?:string;
  name:string;
  email:string;
  street:string;
  city:string;
  state:string;
  number:string;
  document:string;
  complement:string;
  zipCode:string;
}

export interface AddClientOutputDto {
  id?:string;
  name:string;
  email:string;
  street:string;
  city:string;
  state:string;
  number:string;
  document:string;
  complement:string;
  zipCode:string;
  createdAt:Date;
  updatedAt:Date;
}
