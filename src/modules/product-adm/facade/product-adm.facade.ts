import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCasesProps{
  addUseCase:UseCaseInterface;
  stockUseCase:UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase:UseCaseInterface;
  private _checkStockUsecase:UseCaseInterface;
  constructor(useCasesProps:UseCasesProps){
    this._addUsecase = useCasesProps.addUseCase;
    this._checkStockUsecase = useCasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    //caso o dto do caso de uso for diferente do dto da facade, vc vai ter que converter o dto da facade para o dto do caso de uso!
    return this._addUsecase.execute(input);
  }
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input);
  }
}