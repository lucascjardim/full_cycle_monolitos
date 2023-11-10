import Id from "../../../@shared/domain/value-object/id.value-object";

export interface GenerateInvoiceUseCaseInputDto {
  id?:Id,
  name: string;
  document: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: Id;
    name: string;
    price: number;
    quantity:number;
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: Id;
    name: string;
    price: number;
    quantity:number;
    subtotal:number;
  }[];
  total: number;
}