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

// get a word from the word array and
//split the chars into span elements
function updateWord() {
  // needs this or else word won't update
  wordEl.textContent = null
  currentWord = wordsArray[wordIndex]

  // seperates each letter and make a span of each
  // to style each letter individually
  // this will be a h1 with each letter as a child span
  currentWord.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    wordEl.appendChild(charSpan)
  })

  // if the current word is not the last word move to the next word
  // if its the last word reset the index to 0 and start over
  if (wordIndex < wordsArray.length - 1) {
    wordIndex++
  } else {
    wordIndex = 0
  }
}

// get the current value of the input box
// color text as typed
// calculate letters typed correctly
// move to next word
function proccessCurrentWord() {
  // store the current char typed in a var
  curInput = inputEl.value
  // create an arr of the typed chars
  curInputArr = curInput.split('')

  // increment the var charTyped which holds the number of chars typed
  charTyped++
}

// start game
function startGame() {
  updateWord()
}

// ========== PESUDO CODE =========
// all stats set to 0
// once user focus on input => countdown starts
// words appear and change as user types correctly
// when time is up the player correct var is updated and  other player goes
// once both players have gone the higher correct wins the round and their current wins var is updated
// once one player has two wins the win the game and their total wins var is updated
// the current wins var and correct var go back to zero and new game is started on focus again
