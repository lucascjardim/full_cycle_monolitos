import Id from "../../@shared/domain/value-object/id.value-object";
import { GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";

export interface GenerateInvoiceFacadeInputDto {
  id?: Id;
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

export interface FindInvoiceFacadeInputDto {
  id: string;
}

export interface FindInvoiceFacadeOutputDto{
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
    quantity:number;
    subtotal:number;
  }[];
  total: number;
  createdAt: Date;
}

export default interface InvoiceFacadeInterface{
  generate(input:GenerateInvoiceFacadeInputDto):Promise<GenerateInvoiceUseCaseOutputDto>;
  find(input:FindInvoiceFacadeInputDto):Promise<FindInvoiceFacadeOutputDto>;
}