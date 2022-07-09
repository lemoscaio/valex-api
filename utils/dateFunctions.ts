import dayjs from "dayjs"

export function getNowAddAndFormatDate(
  amount: number,
  type: dayjs.ManipulateType,
  format: string,
) {
  return dayjs().add(amount, type).format(format)
}

export function addAndFormatDateExistingDate(
  amount: number,
  type: dayjs.ManipulateType,
  date: string,
) {
  return dayjs(date).add(amount, type).format()
}
