export interface ProcessPaymentUseCaseInputDto{
  orderId:string;
  amount:number;
}

export interface ProcessPaymentUseCaseOutputDto{
  transactionId: string;
  orderId:string;
  amount:number;
  status:string;
  createdAt:Date;
  updatedAt:Date;
}