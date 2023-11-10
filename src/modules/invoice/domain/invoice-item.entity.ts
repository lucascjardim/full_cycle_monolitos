import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";


type propsInvoiceItem = {
  id?:Id,
  name:string;
  price:number;
  quantity:number,
  createdAt?:Date,
  updatedAt?:Date,
}
export default class InvoiceItem extends BaseEntity implements AggregateRoot{
  private _name:string;
  private _price:number;
  private _quantity:number;
  private _subtotal:number;

  constructor(props:propsInvoiceItem){
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._price = props.price;
    this._quantity = props.quantity;
    this._subtotal = 0;
    this.calculateSubtotal();
  }

  calculateSubtotal(){
    this._subtotal = this._price * this._quantity;
  }

  get name():string{
    return this._name;
  }

  get price():number{
    return this._price;
  }

  get quantity():number{
    return this._quantity;
  }

  get subtotal():number{
    return this._subtotal;
  }

}