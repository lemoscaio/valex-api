export function formatEmployeeName(fullName: string) {
  const namesInArray: string[] = fullName.split(" ")

  const formattedName = namesInArray.reduce(
    (acc: string, currentName: string, currentIndex: number) => {
      if (currentIndex === 0 || currentIndex === namesInArray.length - 1)
        return `${acc} ${currentName}`
      if (currentName.length >= 3) return `${acc} ${currentName[0]}`
      else return `${acc} ${currentName}`
    },
    "",
  )

  return formattedName.trim()
}
