import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase{
  private _invoiceRepository:InvoiceGateway;
  constructor(invoiceRepository:InvoiceGateway){
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input:FindInvoiceUseCaseInputDTO):Promise<FindInvoiceUseCaseOutputDTO>{
    try{
      const props = {
        id:input.id
      }

      const invoice = await this._invoiceRepository.find(props.id);
      const invoiceItems = invoice.items.map((element) => {
        return {
          id:element.id.id,
          name:element.name,
          price:element.price,
          quantity:element.quantity,
          subtotal:element.subtotal,
        }
      })
      return {
        id: invoice.id.id,
        name:invoice.name,
        document:invoice.document,
        address:{
          street:invoice.address.street,
          number:invoice.address.number,
          complement:invoice.address.complement,
          city:invoice.address.city,
          state:invoice.address.state,
          zipCode:invoice.address.zipCode,
        },
        items:invoiceItems,
        total:invoice.total,
        createdAt:invoice.createdAt,
      }
    }catch(e){console.log(e)}
    }
}