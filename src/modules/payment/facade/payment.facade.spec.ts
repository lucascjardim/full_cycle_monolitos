import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "../../db.sqlite",
      logging:false,
      sync:{ force:true }
    });
    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an transaction", async() => {
    // const repository = new TransactionRepository();
    // const useCase = new ProcessPaymentUseCase(repository);
    // const facade = new PaymentFacade(useCase);
    const input = {
      orderId:"order-1",
      amount:100
    }
    const facade = PaymentFacadeFactory.create();
    const output = await facade.process(input);
    expect(output.transactionId).toBeDefined();
    expect(output.orderId).toBe(input.orderId);
    expect(output.amount).toBe(input.amount);
    expect(output.status).toBe("approved");
  });
});