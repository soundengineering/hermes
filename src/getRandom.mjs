export const fromRange = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const fromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}
