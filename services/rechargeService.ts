import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function rechargeCarge(cardId: number, amount: number) {
  const rechargedCard = await rechargeRepository.insert({ cardId, amount })

  if (rechargedCard.rowCount === 0) {
    throw {
      status: 400,
      message: "Something went wrong",
    }
  }
}
