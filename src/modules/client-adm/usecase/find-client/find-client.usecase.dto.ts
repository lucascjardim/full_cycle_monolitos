export interface FindClientInputDto {
  id:string;
}

export interface FindClientOutputDto{
  id:string;
  name:string;
  email:string;
  street:string;
  number:string;
  city:string;
  state:string;
  zipCode:string;
  document:string;
  complement:string,
  createdAt:Date;
  updatedAt:Date;
}