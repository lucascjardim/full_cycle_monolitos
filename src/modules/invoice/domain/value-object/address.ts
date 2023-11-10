type propsAddress = {
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

export default class Address {
  private _street: string = "";
  private _number: number = 0;
  private _zip: string = "";
  private _city: string = "";
  private _complement: string = "";
  private _state: string;


  constructor(props:propsAddress) {
    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._zip = props.zipCode;
    this._city = props.city;
    this._state = props.state;
    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get complement():string{
    return this._complement;
  }

  get zipCode(): string {
    return this._zip;
  }

  get state():string{
    return this._state;
  }

  get city(): string {
    return this._city;
  }
  
  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip code is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
  }
}