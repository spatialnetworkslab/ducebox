module.exports.generateRow = function (N) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const randomLetter = () => letters[Math.floor(Math.random() * 26)]
  const randomNumber = () => Math.floor(Math.random() * 10) * 10

  const input = new Array(N).fill(0).map(() => ({
    col1: randomLetter(),
    col2: randomNumber()
  }))

  return input
}
