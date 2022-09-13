// DOM elements
const restartBtn = document.querySelector('.restart')
const player1 = document.querySelector('.player-1')
const player2 = document.querySelector('.player-2')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')
const lettersCorrectEl = document.querySelector('.letters-correct')

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
let errors = 0
let totalErrors = 0

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

// get a word from the word array and split the chars into span elements
function updateWord() {
  // needs this or else word won't update
  wordEl.textContent = null
  currentWord = wordsArray[wordIndex]

  // seperates each letter and make a span of each to style each letter individually => this will be a h1 with each letter as a child span
  currentWord.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    wordEl.appendChild(charSpan)
  })

  // if the current word is not the last word move to the next word, if its the last word reset the index to 0 and start over
  if (wordIndex < wordsArray.length - 1) {
    wordIndex++
  } else {
    wordIndex = 0
  }
}

// get the current value of the input box, color text as typed, calculate letters typed correctly, move to next word
function proccessCurrentWord() {
  // store the current char typed in a var
  curInput = inputEl.value
  // create an arr of the typed chars
  curInputArr = curInput.split('')

  // increment the var charTyped which holds the number of chars typed
  charTyped++

  errors = 0

  // select all the span elements in the provided word
  wordSpanArray = wordEl.querySelectorAll('span')
  wordSpanArray.forEach((char, i) => {
    let typedChar = curInputArr[i]

    // nothing typed
    if (typedChar === null) {
      char.classList.remove('correct', 'incorrect')
    }
    // correct char
    else if (typedChar === char.innerText) {
      char.classList.add('correct')
      char.classList.remove('incorrect')
    }
    // incorrect char
    else {
      char.classList.add('incorrect')
      char.classList.remove('correct')
      errors++
    }
  })

  let correctLetters = charTyped - (totalErrors + errors)
  lettersCorrectEl.textContent = correctLetters
}

// start game
function startGame() {
  updateWord()
}
