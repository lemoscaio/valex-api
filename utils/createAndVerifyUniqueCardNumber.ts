import { faker } from "@faker-js/faker"

import * as cardRepository from "../repositories/cardRepository.js"

export async function createAndVerifyUniqueCardNumber() {
  const cardNumber = faker.finance.creditCardNumber("mastercard")

  const card = await cardRepository.findByNumber(cardNumber)

  if (card) {
    return createAndVerifyUniqueCardNumber()
  }

  return cardNumber
}
