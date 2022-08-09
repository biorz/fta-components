export const createAutoIncrement = (outset = 1) => {
  let id = outset
  return () => id++
}
