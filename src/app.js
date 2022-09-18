// player 0 = player 1
// player 1 = player 2
// DOM Elements
const resetBtn = document.querySelector('.restart')
const player1El = document.querySelector('.player-0')
const player2El = document.querySelector('.player-1')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')
const countdownEl = document.querySelector('.countdown')
const accuracyEl = document.querySelector('.accuracy')

// vars to keep track of things
const URL = 'https://random-words-api.herokuapp.com/w?n=1' // random word
let round = 1 // keep track of each round
let playerWordCount = [0, 0] // keep track of each players correctly typed words
let playerErrors = [0, 0] // keep track of each players correctly typed words
let roundsWon = [0, 0] // keep track of rounds won for each player
let gamesWon = [0, 0] // keep track of total games won for each player
let wordCount = 0 // keep track of num of words typed correclty during the round
let currentPlayer = 0 // keep track of who is current player
let totalErrors = 0 // keep track of total errors
let errors = 0 // keep track of earch letter error
let timeLimit = 10 // sets the time limit on timer
let timer // var for timer
let timeLeft = timeLimit // time left starts with the timelimite and then deincrements
let currentInput // current letter typing
let currentWord // what is the current word
let gameWinner // who won the game
let charsTyped = 0 // keeping track of number of chars typed
let timeElapsed // how much time has elapsed
let accuracy = 0 // key track of accuracy
let winner

// ===== RANDOM WORD API =====
// getting random word. using 'https://random-words-api.herokuapp.com/w?n=1'
function getRandomWord() {
  return fetch(URL)
    .then(res => res.json())
    .then(data => data[0])
}

// ===== UPDATE WORD =====
async function updateWord() {
  wordEl.textContent = null
  currentWord = await getRandomWord()

  // update word in UI
  currentWord.split('').forEach(char => {
    const span = document.createElement('span')
    span.innerText = char
    wordEl.appendChild(span)
  })
}

// ===== PROCESS TEXT =====
// get current value of input. color the char. calc errors & accuracy. update word
function processText() {
  // get current input and split into an array
  currentInput = inputEl.value
  currentInputArr = currentInput.split('')

  // increment chars typed
  charsTyped++

  // loop over input arr. check if letter typed correctly. style accordanly
  wordSpanArr = wordEl.querySelectorAll('span')
  wordSpanArr.forEach((char, i) => {
    let typedChar = currentInputArr[i]

    // no value
    if (!typedChar) {
      char.classList.remove('correct', 'incorrect')
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
      errors++
    }
  })

  // update accuracy
  let correctChars = charsTyped - (totalErrors + errors)
  let accuracyVal = (correctChars / charsTyped) * 100
  accuracyEl.textContent = `${Math.round(accuracyVal)}%`

  if (currentInput === currentWord) {
    updateWord()
    totalErrors += errors
    inputEl.value = ''
    wordCount++
  }
}

// ===== START GAME =====
function startGame() {
  updateWord()

  // clear and start a new timer
  clearInterval(timer)
  timer = setInterval(updateTimer, 1000)
}

// ===== UPDATE TIMER =====
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--
    timeElapsed++
    countdownEl.textContent = `${timeLeft} seconds`
  } else {
    // get stats and update in UI
    getWordCountStats()

    // when the timer runs out switch player
    swithPlayer()
  }
}

// ===== SWITCH PLAYER =====
function swithPlayer() {
  // the round is over. disable the input. after one minute disable it and clear the value
  inputEl.disabled = true
  setTimeout(() => {
    inputEl.disabled = false
    inputEl.value = ''
  }, 1000)

  // clear timer
  clearInterval(timer)

  playerWordCount[currentPlayer] = wordCount
  playerErrors[currentPlayer] = errors

  // reset players word count and total errors
  wordCount = 0
  errors = 0

  // if it's player 2, then round is over. we need to check who won
  if (currentPlayer === 1) {
    if (round === 3) {
      round = 1
    } else {
      round++
    }
    // check who won the round
    roundWinner()
  }

  // change current player
  currentPlayer = currentPlayer === 0 ? 1 : 0

  setTimeout(() => {
    // notify the next player of what to do
    alert(`Player ${currentPlayer + 1}, click in the input field to begin`)
  }, 1000)

  // toggle css class to update UI to show current player
  player1El.querySelector('h3').classList.toggle('current-player')
  player2El.querySelector('h3').classList.toggle('current-player')

  // show next player in UI
  wordEl.textContent = `${currentPlayer === 0 ? 'Player 1' : 'Player 2'}`
  // update the round in the UI
  roundEl.innerHTML = `<span>Round: </span> ${round}`

  // reset time left and errors for next player
  timeLeft = timeLimit

  // reset accuracy for next player
  accuracyEl.textContent = '100%'

  // reset coutdown text
  countdownEl.textContent = `${timeLimit} seconds`
}

// ===== CHECK ROUND =====
function roundWinner() {
  if (playerWordCount[0] === playerWordCount[1]) {
    console.log(playerErrors[0], playerErrors[1])
    if (playerErrors[0] < playerErrors[1]) {
      winner = 0
    } else {
      winner = 1
    }
  } else if (playerWordCount[0] > playerWordCount[1]) {
    winner = 0
  } else {
    winner = 1
  }

  alert(`Player ${winner + 1} won round: ${round - 1}`)

  // update the players round won var
  roundsWon[winner]++

  // select the winner and increment their rounds won var
  document
    .querySelector(`.player-${winner}`)
    .querySelector(
      '.rounds-won'
    ).textContent = `Rounds Won: ${roundsWon[winner]}`

  if (roundsWon[0] === 2 || roundsWon[1] === 2) {
    finishGame()
  }
}

// ===== GET WORD COUNT STATS =====
function getWordCountStats() {
  // update word count in UI for player
  document
    .querySelector(`.player-${currentPlayer}`)
    .querySelector('.word-count').textContent = `Word Count: ${wordCount}`

  // update players total errors number
  document
    .querySelector(`.player-${currentPlayer}`)
    .querySelector('.total-errors').textContent = `Total Errors: ${errors}`
}

// ===== RESET VALUES =====
function resetValues() {
  timeLeft = timeLimit
  timeElapsed = 0
  errors = 0
  totalErrors = 0
  accuracy = 0
  charsTyped = 0
  gamesWon = [0, 0]
  roundsWon = [0, 0]
  wordCount = 0
  totalErrors = 0
  inputEl.disabled = false
  inputEl.value = ''
  wordEl.textContent = 'loading...'
  accuracyEl.textContent = '100%'
  countdownEl.textContent = `${timeLimit} seconds`
  document
    .querySelectorAll('.games-won')
    .forEach(item => (item.textContent = 'Games Won: 0'))
  document
    .querySelectorAll('.rounds-won')
    .forEach(item => (item.textContent = 'Rounds Won: 0'))
  document
    .querySelectorAll('.word-count')
    .forEach(item => (item.textContent = 'Word Count: 0'))
  document
    .querySelectorAll('.total-errors')
    .forEach(item => (item.textContent = 'Total Errors: 0'))
}

// ===== FINISH GAME =====
function finishGame() {
  console.log('finish game')
  clearInterval(timer)
  inputEl.disabled = true
  wordEl.textContent = 'loading'

  winner = roundsWon[0] === 2 ? 0 : 1
  gamesWon[winner]++
  document
    .querySelector(`.player-${winner}`)
    .querySelector('.games-won').textContent = `Games Won: ${gamesWon[winner]}`
  alert(`Player ${winner + 1} won the game 🎉`)
  round = 1
  document.querySelector('.round').innerHTML = `<span>round</span> ${round}`
}

// ===== ALERT STATUS =====
function alertStatus() {
  setTimeout(() => {
    alert(`Player ${currentPlayer + 1} click in the input field to begin`)
  }, 1000)
}

// ===== EVENT LISTERNERS =====
window.addEventListener('DOMContentLoaded', alertStatus)
inputEl.addEventListener('focus', startGame)
inputEl.addEventListener('input', processText)
resetBtn.addEventListener('click', resetValues)
