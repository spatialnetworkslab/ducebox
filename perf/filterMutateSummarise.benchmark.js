const { suite, benchmark } = require('@dynatrace/zakzak')
const { pipe, rowOriented, mutate, filter, summarise, sum } = require('../dist/data-pipe.umd.js')
const R = require('ramda')
const { DataFrame } = require('dataframe-js')
const Lazy = require('lazy.js')

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
const fruitData10k = generateRandomFruitData(10000)

// Filter function
const filterFunc = row => ['apple', 'coconut'].includes(row.fruit)

// Mutate function
const POUND_TO_EURO_EXCHANGE_RATE = 1.19 // 11/12/2019
const mutateFunc = row => row.pricePounds * POUND_TO_EURO_EXCHANGE_RATE

// Imperative for-loop implementation
const forLoop = data => {
  const dataLength = data.length
  let totalPriceEuros = 0

  for (let i = 0; i < dataLength; i++) {
    const row = data[i]

    if (filterFunc(row)) {
      const priceEuros = mutateFunc(row)
      totalPriceEuros += priceEuros
    }
  }

  return totalPriceEuros
}

// Native array methods (filter -> map -> reduce) implementation
const arrayMethods = data => {
  const totalPriceEuros = data
    .filter(filterFunc)
    .map(row => ({ ...row, priceEuros: mutateFunc(row) }))
    .reduce((acc, cur) => acc + cur.priceEuros)

  return totalPriceEuros
}

// Ramda implementation
const ramda = data => {
  const transformation = R.pipe(
    R.filter(filterFunc),
    R.map(row => ({ ...row, priceEuros: mutateFunc(row) })),
    R.reduce((acc, cur) => acc + cur.priceEuros)
  )

  return transformation(data)
}

// dataframe-js implementation
const dataFrame = data => {
  const df = new DataFrame(data, Object.keys(data[0]))

  return df
    .filter(filterFunc)
    .map(row => row.set('priceEuros', row.get('pricePounds') * POUND_TO_EURO_EXCHANGE_RATE))
    .stat.sum('priceEuros')
}

// Lazy.js implementation
const lazy = data => {
  const totalPriceEuros = Lazy(data)
    .filter(filterFunc)
    .map(row => ({ ...row, priceEuros: mutateFunc(row) }))
    .reduce((acc, cur) => acc + cur.priceEuros)

  return totalPriceEuros
}

// data-pipe implementation
const dataPipe = data => {
  const transform = pipe({
    input: rowOriented,
    output: rowOriented,
    transformations: [
      filter(filterFunc),
      mutate('priceEuros', mutateFunc),
      summarise({ meanPriceEuros: sum('priceEuros') })
    ]
  })

  return transform(data)[0].meanPriceEuros
}

suite('filter -> mutate -> summarise', () => {
  // 1k
  benchmark('1k: imperative for-loop', () => {
    forLoop(fruitData1k)
  })

  benchmark('1k: array methods', () => {
    arrayMethods(fruitData1k)
  })

  benchmark('1k: ramda', () => {
    ramda(fruitData1k)
  })

  benchmark('1k: dataframe-js', () => {
    dataFrame(fruitData1k)
  })

  benchmark('1k: Lazy.js', () => {
    lazy(fruitData1k)
  })

  benchmark('1k: data-pipe', () => {
    dataPipe(fruitData1k)
  })

  // 10k
  benchmark('10k: imperative for-loop', () => {
    forLoop(fruitData10k)
  })

  benchmark('10k: array methods', () => {
    arrayMethods(fruitData10k)
  })

  benchmark('10k: ramda', () => {
    ramda(fruitData10k)
  })

  benchmark('10k: dataframe-js', () => {
    dataFrame(fruitData10k)
  })

  benchmark('10k: Lazy.js', () => {
    lazy(fruitData10k)
  })

  benchmark('10k: data-pipe', () => {
    dataPipe(fruitData10k)
  })
})
