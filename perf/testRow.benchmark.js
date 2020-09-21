import { suite, benchmark } from '@dynatrace/zakzak'

const N = 10000
const randomNumber = () => Math.floor(Math.random() * 5)
const randomLetter = () => 'abcde'[randomNumber()]

const data = {
  a: new Array(N).fill(null).map(randomNumber),
  b: new Array(N).fill(null).map(randomLetter)
}

const condition = row => row.a > 2

const newRow = data => {
  const newData = { b: [], c: [] }

  for (let i = 0; i < N; i++) {
    const row = {}

    // get row values
    for (const columnName in data) row[columnName] = data[columnName][i]

    // filter
    if (!condition(row)) continue

    // mutate
    row.c = row.a ** 2

    // select
    delete row.a

    // append to new data
    for (const columnName in newData) newData[columnName].push(row[columnName])
  }

  return newData
}

const recycleRow = data => {
  const newData = { b: [], c: [] }

  const row = {}

  for (let i = 0; i < N; i++) {
    // get row values
    for (const columnName in data) row[columnName] = data[columnName][i]

    // filter
    if (!condition(row)) continue

    // mutate
    row.c = row.a ** 2

    // select
    delete row.a

    // append to new data
    for (const columnName in newData) newData[columnName].push(row[columnName])

    // clean row
    delete row.c
  }

  return newData
}

suite('test', () => {
  benchmark('creating new row each iteration', () => {
    newRow(data)
  })

  benchmark('recycling row object', () => {
    recycleRow(data)
  })
})
