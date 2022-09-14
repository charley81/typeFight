// DOM elements
const restartBtn = document.querySelector('.restart')
const player1El = document.querySelector('.player-1')
const player2El = document.querySelector('.player-2')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')
const accuracyEl = document.querySelector('.accuracy')
const countdownEl = document.querySelector('#session-info').querySelector('p')

// vars to keep track of things
let currentWins = [0, 0]
let totalWins = [0, 0]
let correct = [0, 0]
let currentPlayer = 0
let currentScore = 0
let timeLimit = 20
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

  // get all span elements from the word h1
  wordsSpanArray = wordEl.querySelectorAll('span')
  // loop over the array of spans to check if user input is correct or not
  wordsSpanArray.forEach((char, index) => {
    // get the current char in the input arr
    let typedChar = curInputArr[index]

    // nothing entered
    if (typedChar == null) {
      char.classList.remove('correct')
      char.classList.remove('incorrect')
    }
    // correct
    else if (typedChar === char.innerText) {
      char.classList.add('correct')
      char.classList.remove('incorrect')
    }
    // incorrect
    else {
      char.classList.add('incorrect')
      char.classList.remove('correct')
      errors++
    }
  })

  // calculate total letters correct
  let correctChars = charTyped - (totalErrors + errors)
  // calculate accuracy percentage
  let accuracyPerc = (correctChars / charTyped) * 100
  // round the accuracy percentage and add to accuracy DOM element
  accuracy.textContent = Math.round(accuracyPerc)

  // if the length of the current input word is the same as the current word to be typed then update to a new word
  // ===== UPDATE THIS TO CHECK IF THE TYPED WORD IS THE SAME AS THE CURRENTWORD
  if (curInput.length === currentWord.length) {
    updateWord()
    inputEl.value = ''
  }
}

// start game when user focuses on the input box.... reset all values, update the word, create a new timer
function startGame() {
  // reset all values back to zero except for total wins
  resetValues()
  // run updateWord function to get a new word
  updateWord()

  // clear old timer and start a new one (STARTS TIMER)
  clearInterval(timer)
  // run this functio nevery second which updates the timer
  timer = setInterval(updateTimer, 1000)
}

// reset all values in UI back to zero except for total wins
function resetValues() {
  timeLeft = timeLimit
  timeElapsed = 0
  errors = 0
  totalErrors = 0
  accuracy = 0
  charTyped = 0
  wordIndex = 0
  inputEl.disabled = false

  inputEl.value = ''
  wordEl.textContent = 'start typing when ready'
  accuracyEl.textContent = 100
}

// update the time, finish the game
function updateTimer() {
  // when update timer function is called which, setInterval is set to 1000ms (1s)
  if (timeLeft > 0) {
    timeLeft--
    timeElapsed++
    countdownEl.textContent = `${timeLeft}s Remaining`
    restartBtn.style.display = 'none'
  }
  // if timeLeft is not > 0 then the round is over, update the timer to round over and run finish game
  else {
    countdownEl.textContent = 'round over'
    finishGame()
  }
}

// finish game.. delete the timer, display restart game btn, calculate number of words typed for each player and determine who won
function finishGame() {
  // stop timer
  clearInterval(timer)

  // disable the input
  inputEl.disabled = true
  // update the word text
  wordEl.textContent = 'click restart'
  // show the reset button
  restartBtn.style.display = 'block'

  // calculate amount of words typed
  // update the words var in player info
}
