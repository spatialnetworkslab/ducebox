import { geojson, compose, select, mutate, into } from '../../src/index.js'
import {
  rowData,
  geojsonData,
  expectedRowData,
  expectedGeojsonData
} from './__data__/geojson.js'

const xf = compose(
  select(['geometryColumn', 'col2']),
  mutate({ col3: ({ col2 }) => col2 * 10 })
)

describe('geojson: input and output', () => {
  it('geojson -> row', () => {
    const input = geojson.wrap(geojsonData, 'geometryColumn')

    expect(into([], xf, input)).toEqual(expectedRowData)
  })

  it('row -> geojson', () => {
    const accumulator = geojson.accumulator('geometryColumn')

    expect(into(accumulator, xf, rowData)).toEqual(expectedGeojsonData)
  })

  it('geojson -> geojson', () => {
    const input = geojson.wrap(geojsonData, 'geometryColumn')
    const accumulator = geojson.accumulator('geometryColumn')

    expect(into(accumulator, xf, input)).toEqual(expectedGeojsonData)
  })
})
