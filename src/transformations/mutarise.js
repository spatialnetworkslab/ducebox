import { curryTransformation } from './_curry.js'
import { getDataLength } from '../utils'
import { summarise } from './summarise.js'

let mutarise = function (data, mutariseInstructions, by) {

}

mutarise = curryTransformation(mutarise)

export { mutarise }
