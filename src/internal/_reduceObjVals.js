export default function _reduceObjVals (step, acc, obj) {
  for (const key in obj) {
    const val = obj[key]

    acc = step(acc, val)

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value']
      break
    }
  }

  return acc
}
