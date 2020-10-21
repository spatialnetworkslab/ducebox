export const rowData = [
  {
    geometryColumn: {
      type: 'Point',
      coordinates: [102.0, 0.5]
    },
    col1: 'value0',
    col2: 0
  },
  {
    geometryColumn: {
      type: 'LineString',
      coordinates: [
        [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
      ]
    },
    col1: 'value1',
    col2: 1
  },
  {
    geometryColumn: {
      type: 'Polygon',
      coordinates: [
        [
          [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
          [100.0, 1.0], [100.0, 0.0]
        ]
      ]
    },
    col1: 'value2',
    col2: 2
  }
]

export const geojsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [102.0, 0.5]
      },
      properties: {
        col1: 'value0',
        col2: 0
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
        ]
      },
      properties: {
        col1: 'value1',
        col2: 1
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
            [100.0, 1.0], [100.0, 0.0]
          ]
        ]
      },
      properties: {
        col1: 'value2',
        col2: 2
      }
    }
  ]
}

export const expectedRowData = [
  {
    geometryColumn: {
      type: 'Point',
      coordinates: [102.0, 0.5]
    },
    col2: 0,
    col3: 0
  },
  {
    geometryColumn: {
      type: 'LineString',
      coordinates: [
        [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
      ]
    },
    col2: 1,
    col3: 10
  },
  {
    geometryColumn: {
      type: 'Polygon',
      coordinates: [
        [
          [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
          [100.0, 1.0], [100.0, 0.0]
        ]
      ]
    },
    col2: 2,
    col3: 20
  }
]

export const expectedGeojsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [102.0, 0.5]
      },
      properties: {
        col2: 0,
        col3: 0
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
        ]
      },
      properties: {
        col2: 1,
        col3: 10
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
            [100.0, 1.0], [100.0, 0.0]
          ]
        ]
      },
      properties: {
        col2: 2,
        col3: 20
      }
    }
  ]
}
