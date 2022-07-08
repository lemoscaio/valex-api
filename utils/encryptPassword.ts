import Cryptr from "cryptr"

export function encryptPassword(password: string) {
  const cryptr = new Cryptr(process.env.CRYPTR_KEY)
  return cryptr.encrypt(password)
}
