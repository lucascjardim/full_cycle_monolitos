import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?:Id,
  name:string;
  email:string;
  street:string;
  city:string;
  zipCode:string;
  number:string,
  state:string;
  document:string;
  complement:string;
  createdAt?:Date;
  updatedAt?:Date;
}

export default class Client extends BaseEntity implements AggregateRoot{
  private _name: string;
  private _street: string;
  private _city: string;
  private _zipCode: string;
  private _state: string;
  private _document: string;
  private _email: string;
  private _number:string;
  private _complement:string;

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }
  public get street(): string {
    return this._street;
  }

  public get city(): string {
    return this._city;
  }

  public get zipCode(): string {
    return this._zipCode;
  }
  public get state(): string {
    return this._state;
  }

  public get number(): string {
    return this._number;
  }

  public get document(): string {
    return this._document;
  }
  public get complement(): string {
    return this._complement;
  }

  constructor(props:ClientProps){
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._street = props.street;
    this._city = props.city;
    this._zipCode = props.zipCode;
    this._number = props.number;
    this._state = props.state;
    this._document = props.document;
    this._complement = props.complement;
  }

}