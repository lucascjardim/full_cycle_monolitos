import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import Address from "../domain/value-object/address";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway{
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id:invoice.id.id,
      name:invoice.name,
      document:invoice.document,
      total:invoice.total,
      createdAt:invoice.createdAt,
      street:invoice.address.street,
      number:invoice.address.number,
      complement:invoice.address.complement,
      city:invoice.address.city,
      state:invoice.address.state,
      zipCode:invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price:item.price,
        subtotal:item.subtotal,
        quantity: item.quantity,
      })),
    },{
      include: [{model: InvoiceItemModel}],
    });
  }
  async find(id: string): Promise<Invoice> {
    let result = await InvoiceModel.findOne({where: {id}, include: 'items'});
    
    result = result.dataValues
    result.items = result.items.map(item => item.dataValues);
    
    let items:InvoiceItem[] = [];
    result.items.map(item => {
      const newItem = new InvoiceItem({
        id:new Id(item.id),
        name:item.name,
        price:item.price,
        quantity:item.quantity,
      });
      items.push(newItem);
    });
    const invoice = new Invoice({
      id: new Id(result.id),
      name:result.name,
      document:result.document,
      items:items
    });

    const address = new Address({
      street: result.street,
      number: result.number,
      complement: result.complement,
      city: result.city,
      state: result.state,
      zipCode: result.zipCode,
    });
    invoice.setAddress(address);
    return invoice;
  
  }

}