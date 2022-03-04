export function delay(delayTime = 25): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, delayTime)
  })
}
