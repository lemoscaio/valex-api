import Cryptr from "cryptr"
import bcrypt from "bcrypt"

const cryptr = new Cryptr(process.env.CRYPTR_KEY)

function encryptSecurityCode(password: string) {
  return cryptr.encrypt(password)
}

function encryptPassword(password: string) {
  const saltRounds = 10
  return bcrypt.hashSync(password, saltRounds)
}

function decryptSecurityCode(encryptedSecurityCode: string) {
  return cryptr.decrypt(encryptedSecurityCode)
}

function decryptPassword(password: string, encryptedPassword: string) {
  const comparedPassword = bcrypt.compareSync(password, encryptedPassword)
  return comparedPassword
}

export const security = {
  encryptSecurityCode,
  encryptPassword,
  decryptSecurityCode,
  decryptPassword,
}
