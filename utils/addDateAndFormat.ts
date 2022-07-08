import dayjs from "dayjs"

export function addAndFormatDate(
  amount: number,
  type: dayjs.ManipulateType,
  format: string,
) {
  return dayjs().add(amount, type).format(format)
}
