const { suite, benchmark } = require('@dynatrace/zakzak')

// Data
const fruits = ['apple', 'banana', 'coconut', 'durian']

function generateRandomFruitData (N) {
  return new Array(N)
    .fill(0)
    .map(() => ({
      fruit: fruits[Math.floor(Math.random() * fruits.length)],
      pricePounds: Math.floor(Math.random() * 200) / 100
    }))
}

const fruitData1k = generateRandomFruitData(1000)
// const fruitData10k = generateRandomFruitData(10000)
// const fruitData100k = generateRandomFruitData(100000)

// // Filter functions
const filterFunc1 = row => ['apple', 'coconut'].includes(row.fruit)
// const filterFunc2 = row => row.priceEuros < 2

// Imperative for-loop implementation
// TODO

// Native filter -> map -> reduce implementation
// TODO

// suite('1k: filter -> mutate -> summarise', () => {

// })

// suite('10k: filter -> mutate -> summarise', () => {

// })

// suite('100k: filter -> mutate -> summarise', () => {

// })

suite('zakzak test', () => {
  benchmark('zakzak works', () => {
    fruitData1k.filter(filterFunc1)
  })
})
