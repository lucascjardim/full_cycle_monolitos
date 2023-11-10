import FindInvoiceUseCase from "../usecase/find-invoice/find.invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
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
  async generate(input: GenerateInvoiceFacadeInputDto): Promise<void> {
    await this._generateInvoiceUseCase.execute(input);
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    const invoice = await this._findInvoiceUseCase.execute(input)
    return invoice;
  }
}