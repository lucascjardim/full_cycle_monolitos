import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?:Id,
  name:string,
  description:string,
  salesPrice:number,
  quantity:number,
}

export default class Product extends BaseEntity implements AggregateRoot{
  private _name:string;
  private _description:string;
  private _salesPrice:number;
  private _quantity:number;
  private _subtotal:number;

  constructor(props:ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._salesPrice = props.salesPrice;
    this._quantity = props.quantity;
    this.calculateSubtotal()
  }
  calculateSubtotal(){
    this._subtotal = this._quantity * this._salesPrice;
  }

  get subtotal():number{
    return this._subtotal;
  }

  get quantity():number{
    return this._quantity;
  }

  get name():string{
    return this._name;
  }

  get description():string{
    return this._description;
  }

  get salesPrice():number{
    return this._salesPrice;
  }

}