import { faker } from "@faker-js/faker"

import * as cardRepository from "../repositories/cardRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as rechargeRepository from "../repositories/rechargeRepository.js"

import { addAndFormatDate } from "../utils/addDateAndFormat.js"
import { encryptSecurityCode } from "../utils/encryptPassword.js"
import { formatEmployeeName } from "../utils/formatEmployeeName.js"

export async function createCard(
  employee: { id: number; fullName: string },
  cardType: cardRepository.TransactionTypes,
) {
  const cardData = createCardData(employee.id, employee.fullName, cardType)

  const createdCard = await cardRepository.insert(cardData)

  if (createdCard.rowCount === 0) {
    throw {
      status: 400,
      message: "Something went wrong",
    }
  }
}

function createCardData(
  employeeId: number,
  employeeFullName: string,
  cardType: cardRepository.TransactionTypes,
  password: string = null,
  isVirtual: boolean = false,
  originalCardId: number = null,
) {
  const cardNumber = faker.finance.creditCardNumber()
  const cardholderName = formatEmployeeName(employeeFullName)
  const securityCode = faker.finance.creditCardCVV()
  console.log("🚀 ~ securityCode", securityCode)
  const hashSecurityCode = encryptSecurityCode(securityCode)
  const expirationDate = addAndFormatDate(5, "years", "MM/YY")
  const isBlocked = false

  const cardData = {
    employeeId,
    number: cardNumber,
    cardholderName,
    securityCode: hashSecurityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type: cardType,
  }

  return cardData
}

export async function updateCard(
  id: number,
  cardData: cardRepository.CardUpdateData,
) {
  cardRepository.update(id, cardData)
}

export function createUpdateCardData(cardKeys: cardRepository.CardUpdateData) {
  const cardData: cardRepository.CardUpdateData = {
    password: cardKeys.password,
  }

  return cardData
}

export async function gatherCardDetails(cardId: number) {
  interface cardBalanceAndStatements {
    balance: number
    transactions: paymentRepository.PaymentWithBusinessName[]
    recharges: rechargeRepository.Recharge[]
  }

  const cardPayments = await paymentRepository.findByCardId(cardId)
  const cardRecharges = await rechargeRepository.findByCardId(cardId)
  const cardBalance = calculateCardBalance(cardPayments, cardRecharges)

  const cardBalanceAndStatements = {
    balance: cardBalance,
    transactions: cardPayments,
    recharges: cardRecharges,
  }

  return cardBalanceAndStatements
}

export function calculateCardBalance(
  payments: paymentRepository.PaymentWithBusinessName[],
  recharges: rechargeRepository.Recharge[],
) {
  const totalRecharge = recharges.reduce(
    (acc: number, current: { amount: number }) => {
      return current.amount
    },
    0,
  )

  const totalSpent = payments.reduce(
    (acc: number, current: { amount: number }) => {
      return current.amount
    },
    0,
  )

  return totalRecharge - totalSpent
}
