module.exports.generateCol = function (N) {
  const letters = 'abcdefghijklmnopqrstuvwxyz'
  const randomLetter = () => letters[Math.floor(Math.random() * 26)]
  const randomNumber = () => Math.floor(Math.random() * 10) * 10

  const input = { col1: [], col2: [] }

  for (let i = 0; i < N; i++) {
    input.col1.push(randomLetter())
    input.col2.push(randomNumber())
  }

  return input
}
