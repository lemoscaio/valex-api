import * as paymentRepository from "../repositories/paymentRepository.js"
import * as cardService from "../services/cardService.js"

export async function insertNewPayment({
  cardId,
  businessId,
  amount,
}: paymentRepository.PaymentInsertData) {
  await checkIfCardBalanceIsPositive(cardId, amount)

  const insertedPayment = await paymentRepository.insert({
    cardId,
    businessId,
    amount,
  })

  if (insertedPayment.rowCount === 0) {
    throw {
      status: 400,
      message: "Something went wrong",
    }
  }
}

export async function checkIfCardBalanceIsPositive(
  cardId: number,
  amount: number,
) {
  const { balance } = await cardService.gatherCardBalanceAndStatements(cardId)

  if (balance < amount) throw { status: 400, message: "Insufficient funds" }
}
