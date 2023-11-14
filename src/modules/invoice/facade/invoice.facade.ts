import FindInvoiceUseCase from "../usecase/find-invoice/find.invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import { GenerateInvoiceUseCaseOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
  findInvoiceUseCase:FindInvoiceUseCase,
  generateInvoiceUseCase:GenerateInvoiceUseCase,
}


export default class InvoiceFacade implements InvoiceFacadeInterface{
  private _findInvoiceUseCase:FindInvoiceUseCase;
  private _generateInvoiceUseCase:GenerateInvoiceUseCase;

  constructor(props:UseCaseProps){
    this._findInvoiceUseCase = props.findInvoiceUseCase;
    this._generateInvoiceUseCase = props.generateInvoiceUseCase;
  }
  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    let invoice = await this._generateInvoiceUseCase.execute(input);
    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.street,
      number: invoice.number,
      complement: invoice.complement,
      city: invoice.city,
      state: invoice.state,
      zipCode: invoice.zipCode,
      items: invoice.items.map((p) => {
        return {
          id:p.id,
          name:p.name,
          price:p.price,
          quantity: p.quantity,
          subtotal:p.subtotal,
        }
      }),
      total: invoice.total,
    }
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    const invoice = await this._findInvoiceUseCase.execute(input)
    return invoice;
  }
}