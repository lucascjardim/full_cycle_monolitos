import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/value-object/address";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
  private _invoiceRepository:InvoiceGateway;
  constructor(invoiceRepository:InvoiceGateway){
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input:GenerateInvoiceUseCaseInputDto):Promise<GenerateInvoiceUseCaseOutputDto>{
    let items:InvoiceItem[]=[];
    input.items.map((element) => {  
      let newItem = new InvoiceItem({
      id:element.id,
      name:element.name,
      price:element.price,
      quantity:element.quantity,
      });
      items.push(newItem);
    })

    const address = new Address({
      street:input.street,
      number:input.number,
      complement:input.complement,
      city:input.city,
      state:input.state,
      zipCode:input.zipCode,
    });

    const invoice = new Invoice({
      id:input.id,
      name:input.name,
      document:input.document,
      items:items,
    })
    invoice.setAddress(address);

    await this._invoiceRepository.generate(invoice);
    const newItems:InvoiceItem[]=[];
    invoice.items.map((element) => { 
        const itemInvoice = new InvoiceItem({
        id:element.id,
        name:element.name,
        price:element.price,
        quantity:element.quantity,
      });
      newItems.push(itemInvoice);
    })
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: newItems,
      total: invoice.total,
    }
  }
}