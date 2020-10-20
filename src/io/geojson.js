import { identity } from 'ramda'

export function wrap (data, geometryColumn = '@@geometry') {
  const length = _getLength(data)

  return {
    reduce: function (step, acc) {
      let idx = 0

      while (idx < length) {
        const feature = data.features[idx]
        const row = feature.properties

        row[geometryColumn] = feature.geometry

        acc = step(acc, row)

        if (acc && acc['@@transducer/reduced']) {
          acc = acc['@@transducer/value']
          break
        }

        idx += 1
      }

      return acc
    }
  }
}

export function accumulator (geometryColumn = '@@geometry') {
  return new GeoJSONAccumulator(geometryColumn)
}

function _getLength (data) {
  return data.features.length
}

function GeoJSONAccumulator (geometryColumn) {
  this.geometryColumn = geometryColumn
}

GeoJSONAccumulator.prototype['@@transducer/init'] = _init
GeoJSONAccumulator.prototype['@@transducer/result'] = identity
GeoJSONAccumulator.prototype['@@transducer/step'] = _step

function _init () {
  return {
    type: 'FeatureCollection',
    features: []
  }
}

function _step (acc, row) {
  const geometry = row[this.geometryColumn]
  const properties = row
  delete properties[this.geometryColumn]

  acc.features.push({
    type: 'Feature',
    geometry,
    properties
  })

  return acc
}
