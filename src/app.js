// DOM Elements
const restartBtn = document.querySelector('.restart')
const player0El = document.querySelector('.player-0')
const player1El = document.querySelector('.player-1')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')
const countdownEl = document.querySelector('#session-info').querySelector('p')

// vars to keep track of things
let round = 1
const playerWordCount = [0, 0]
const currentWins = [0, 0]
const totalWins = [0, 0]
const correctWords = 0
let currentPlayer = 0
let totalErrors = 0
let errors = 0
let wordIndex = 0
let timeLimit = 10
let timer
let timeLeft = timeLimit
let currentInputLetter
let currentWord

// array of words to be typed
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

// ===== start game =====
function startRound() {
  reset()
  updateWord()
  // clear all timers
  clearInterval(timer)
  // run the function updateTimer every 1 sec => start new timers
  timer = setInterval(updateTimer, 1000)
}

// ===== reset =====
function reset() {
  console.log('reseting')
}

// ===== update word =====
function updateWord() {
  // removes the loading text once clicking into input
  wordEl.textContent = null

  // get a word to type from the array of words
  currentWord = wordsArray[wordIndex]

  // seperates each letter of cuurent word and creates a span and appends to the current word h1
  currentWord.split('').forEach(char => {
    const span = document.createElement('span')
    span.innerText = char
    wordEl.appendChild(span)
  })

  // each time this function is called update the wordIndex to change the word
  wordIndex < wordsArray.length - 1 ? wordIndex++ : (wordIndex = 0)
}

// ===== updateTimer =====
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--
    countdownEl.textContent = `${timeLeft}s Remaining`
  }
}

// ===== handleChangeOver =====
function handleChangeOver() {
  let winner
  const [p0WordCount, p1WordCount] = playerWordCount
  if (p0WordCount === 2 || p1WordCount === 2) {
    if (p0WordCount > p1WordCount) {
      winner = 'player 1'
      totalWins[0]++
    } else {
      winner = 'player 2'
      totalWins[1]++
    }
    finishGame(winner)
  }
}

// ===== editTypedWord =====
// all this function does is edit the word to be typed by adding and removing css classes showing green for correctly tpyed letter and red for wrong letter typed
function editTypedWord() {
  currInputLetter = inputEl.value
  const currInputArray = currInputLetter.split('')

  // get all spans from h1
  wordSpanArray = wordEl.querySelectorAll('span')

  // loop over array to see if user typed correct letter or not
  wordSpanArray.forEach((char, i) => {
    // get the current typed letter from the currInputArray
    let typedChar = currInputArray[i]

    // nothing entered
    if (!typedChar) {
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
      char.classList.remove('correct')
      char.classList.add('incorrect')
    }
  })
}

// ===== finishGame =====
function finishGame(winner) {
  console.log(`Game Over: ${winner} won`)
}

// ===== event listeners =====
// listen for when user clicks/focuses into input
inputEl.addEventListener('focus', startRound)
// listen for input every change
inputEl.addEventListener('input', editTypedWord)
