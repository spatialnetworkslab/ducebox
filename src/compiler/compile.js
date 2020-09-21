import { getDataLength } from '../utils'

export function compile (instructions) {
  return function (data) {
    const dataLength = getDataLength(data)

    for (let i = 0; i < dataLength; i++) {
      
    }
  }
}
