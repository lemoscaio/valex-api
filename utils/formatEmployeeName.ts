export function formatEmployeeName(fullName: string) {
  const namesInArray: string[] = fullName.split(" ")

  const nameLengthLimit = 3

  const formattedName = namesInArray.reduce(
    (acc: string, currentName: string, currentIndex: number) => {
      if (
        currentName.length >= nameLengthLimit &&
        currentIndex !== 0 &&
        currentIndex !== namesInArray.length - 1
      )
        return `${acc} ${currentName[0]}`
      else return `${acc} ${currentName}`
    },
    "",
  )

  console.log(formattedName)
  return formattedName.trim()
}
