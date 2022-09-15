// DOM elements
const restartBtn = document.querySelector('.restart')
const player0El = document.querySelector('.player-0')
const player1El = document.querySelector('.player-1')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')
const accuracyEl = document.querySelector('.accuracy')
const countdownEl = document.querySelector('#session-info').querySelector('p')

// vars to keep track of things
const playersWordCount = [0, 0]
const currentWins = [0, 0]
const totalWins = [0, 0]
const correct = [0, 0]
let currentPlayer = 0
let currentScore = 0
let timeLimit = 10
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

// ===== START GAME =====
// start game when user focuses on the input box.... reset all values, update the word, create a new timer
function startGame() {
  // reset all values back to zero except for total wins
  resetValues()
  // run updateWord function to get a new word
  updateWord()

  // clear old timer and start a new one (STARTS TIMER)
  clearInterval(timer)
  // run this function nevery second which updates the timer
  timer = setInterval(updateTimer, 1000)
}

// ===== UPDATE WORD =====
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

// ===== PROCESS WORD =====
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
  let correctChars = charTyped - errors

  // if the current input word is the same as the current word to be typed then update to a new word
  if (curInput === currentWord) {
    updateWord()
    inputEl.value = ''
    words++
  }
}

// ===== RESET VALUES =====
// reset all values in UI back to zero except for total wins
function resetValues(checkWordUpdate) {
  timeLeft = timeLimit
  timeElapsed = 0
  errors = 0
  totalErrors = 0
  accuracy = 0
  charTyped = 0
  wordIndex = 0
  inputEl.disabled = false
  inputEl.value = ''
  clearInterval(timer)
  countdownEl.textContent = `${timeLeft}s Remaining`
  // If resetValues is passsed a truthy value, then reset words var to 0 => this is for clicking the reset button => see reset btn event listener
  if (checkWordUpdate) {
    wordEl.textContent = 'loading...'
    words = 0
    document
      .querySelector(`.player-${currentPlayer}`)
      .querySelector('.words').textContent = words
  }
}

// ===== UPDATE TIMER =====
// update the time, finish the game
function updateTimer() {
  // when update timer function is called which, setInterval is set to 1000ms (1s)
  if (timeLeft > 0) {
    timeLeft--
    timeElapsed++
    countdownEl.textContent = `${timeLeft}s Remaining`
  }
  // if timeLeft is not > 0 then the round is over, update the timer to round over and run finish game
  else {
    // at this point no time left on countdown, turn is over... check if one player has 2 wins and if so game over if not then switch players
    const [player1Words, player2Words] = currentWins
    if (player1Words === 2 || player2Words === 2) {
      countdownEl.textContent = 'game over'
      resetValues()
      finishGame()
    } else {
      // switch player
      document
        .querySelector(`.player-${currentPlayer}`)
        .querySelector('.words').textContent = 0
      resetValues()
      finishGame()
      currentPlayer = currentPlayer === 0 ? 1 : 0
      words = 0
    }
  }
}

// ===== FINISH GAME =====
// finish game.. delete the timer, calculate number of words typed for each player and determine who won
function finishGame() {
  // stop timer
  clearInterval(timer)

  // disable the input
  // save this for when the game is over
  // inputEl.disabled = true
  // update the word text
  wordEl.textContent = 'round over...'

  // restart the game when user focuses on input
  inputEl.addEventListener('click', startGame)

  // calculate amount of words typed
  // update the words var in player info
  console.log(currentPlayer)
  document
    .querySelector(`.player-${currentPlayer}`)
    .querySelector('.words').textContent = `Words: ${words}`
}

// ===== EVENT LISTENERS =====
// as you input something into the input field run this function
inputEl.addEventListener('input', proccessCurrentWord)
// as the user places their cursor into the input field (i.e when they focus on the input)
inputEl.addEventListener('focus', startGame)
// when the user clicks the reset btn, reset the game... passing in true here => when true is passed to the reset values function it does some extra to reset the home game vs. reset the number vars at the end of each round
restartBtn.addEventListener('click', () => resetValues(true))
