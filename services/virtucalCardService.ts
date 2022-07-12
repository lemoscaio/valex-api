import { faker } from "@faker-js/faker"

import * as cardRepository from "../repositories/cardRepository.js"
import { createAndVerifyUniqueCardNumber } from "../utils/createAndVerifyUniqueCardNumber.js"
import { getNowAddAndFormatDate } from "../utils/dateFunctions.js"
import { security } from "../utils/encryptionFunctions.js"

export async function createVirtualCard(
  card: cardRepository.Card,
  password: string,
) {
  const cardData: cardRepository.CardInsertData = await createVirtualCardData(
    card.employeeId,
    card.cardholderName,
    card.type,
    password,
    card.id,
  )
  console.log("🚀 ~ cardData", cardData)

  const createdCard = await cardRepository.insert(cardData)

  if (createdCard.rowCount === 0) {
    throw {
      status: 400,
      message: "Something went wrong",
    }
  }
}

async function createVirtualCardData(
  employeeId: number,
  cardholderName: string,
  cardType: cardRepository.TransactionTypes,
  password: string = null,
  originalCardId: number = null,
) {
  const cardNumber: string = await createAndVerifyUniqueCardNumber()
  const securityCode = faker.finance.creditCardCVV()
  console.log("🚀 ~ securityCode", securityCode)
  const hashSecurityCode = security.encryptSecurityCode(securityCode)
  const hashPassword = security.encryptPassword(password)
  const expirationDate = getNowAddAndFormatDate(5, "years", "MM/YY")
  const isBlocked: boolean = false

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName,
    securityCode: hashSecurityCode,
    expirationDate,
    password: hashPassword,
    isVirtual: true,
    originalCardId,
    isBlocked,
    type: cardType,
  }

  return cardData
}
