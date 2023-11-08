import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPaymentUseCaseInputDto, ProcessPaymentUseCaseOutputDto } from "./process-payment.usecase.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface{

  constructor(private transactionRepository:PaymentGateway){}

  async execute(input: ProcessPaymentUseCaseInputDto): Promise<ProcessPaymentUseCaseOutputDto> {
    const transaction = new Transaction({
      amount:input.amount,
      orderId:input.orderId,
    });

    transaction.process();

    const persistTransaction = await this.transactionRepository.save(transaction);
    return {
      transactionId:persistTransaction.id.id,
      orderId:persistTransaction.orderId,
      amount:persistTransaction.amount,
      status:persistTransaction.status,
      createdAt:persistTransaction.createdAt,
      updatedAt:persistTransaction.updatedAt,
    }
  }
}
