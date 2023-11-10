import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import InvoiceItem from "./invoice-item.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "./value-object/address";

type PropsInvoice = {
  id?:Id,
  name:string;
  document:string;
  items:InvoiceItem[];
  createdAt?:Date,
  updatedAt?:Date,
}

export default class Invoice extends BaseEntity implements AggregateRoot{
  private _name:string;
  private _document:string;
  private _address!:Address;
  private _total:number
  private _items:InvoiceItem[];

  constructor(props:PropsInvoice){
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._items = props.items;
    this._total = 0;
    this.calculateTotal();
  }

  calculateTotal(){
    if(this._items && this._items.length > 0){
      this._total = this._items.reduce((acc, vl) => acc + (vl.price * vl.quantity),0)
    }
  }

  get total():number{
    return this._total;
  }

  get name():string{
    return this._name;
  }

  get document():string{
    return this._document;
  }

  get address():Address{
    return this._address;
  }

  get items():InvoiceItem[]{
    return this._items;
  }

  setAddress(address:Address){
    this._address = address;
  }
}