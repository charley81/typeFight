// DOM elements
const restartBtn = document.querySelector('.restart')
const player1 = document.querySelector('.player-1')
const player2 = document.querySelector('.player-2')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')

// vars to keep track of things
const currentWins = [0, 0]
const totalWins = [0, 0]
const correct = [0, 0]
let currentPlayer = 0
let currentScore = 0
let timeLimit = 60
let currentWord = ''
let round = 1
let timeLeft = timeLimit
let timeElapsed = 0
let timer = null
let wordIndex = 0
let letters = 0
let words = 0
let charTyped = 0

// array of words to type
const wordsArray = [
  'Ablutophobia',
  'Arachibutyrophobia',
  'Batrachomyomachy',
  'Blandiloquence',
  'Cacodemomania',
  'Ceruminiferous',
  'Chronosynchronicity',
  'Defecaloesiophobia',
  'Didaskaleinophobia',
  'Edriophthalmous',
  'Epiphenomenalism',
  'Fibrochondrosteal',
  'Forisfamiliation',
  'Gastrohysterotomy',
  'Galactodensimeter',
  'Gynotikolobomassophile',
  'Hexakosioihexekontahexaphobia',
  'Incomprehensibleness',
  'Jungermanniaceae',
  'Katathermometer',
]

inputEl.addEventListener('focus', () => {
  updateWord()
})

function updateWord() {
  wordEl.textContent = null
  currentWord = wordsArray[wordIndex]

  // seperates each letter and make a span of each
  // to style each letter individually
  currentWord.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    wordEl.appendChild(charSpan)
  })

  if (wordIndex < wordsArray.length - 1) {
    wordIndex++
  } else {
    wordIndex = 0
  }
}

// ========== PESUDO CODE =========
// all stats set to 0
// once user focus on input => countdown starts
// words appear and change as user types correctly
// when time is up the player correct var is updated and  other player goes
// once both players have gone the higher correct wins the round and their current wins var is updated
// once one player has two wins the win the game and their total wins var is updated
// the current wins var and correct var go back to zero and new game is started on focus again
