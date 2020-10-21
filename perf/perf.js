const params = process.argv.slice(3)

if (params.length === 0) {
  require('child_process').fork('./node_modules/.bin/zakzak')
}

if (params.length === 1) {
  require('child_process').fork(
    './node_modules/.bin/zakzak',
    ['-p', `./**/${params[0]}.benchmark.js`]
  )
}

if (params.length > 1) {
  throw new Error('Too many params')
}
