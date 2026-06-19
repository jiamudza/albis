export const getNextQuestionNumber = (
  date: string,
  lastDate?: string,
  lastNumber = 0
) => {
  if (date !== lastDate) return 1
  return lastNumber + 1
}
