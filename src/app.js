// player0 = player 1
// player1 = player 2

// DOM Elements
const restartBtn = document.querySelector('.restart')
const player0El = document.querySelector('.player-0')
const player1El = document.querySelector('.player-1')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')
const countdownEl = document.querySelector('#session-info').querySelector('p')
const timeRemaining = document.querySelector('#session-info').querySelector('p')

// vars to keep track of things
let round = 1
const playerWordCount = [0, 0]
const roundsWon = [0, 0]
const gamesWon = [0, 0]
let correctWords = 0
let currentPlayer = 0
let totalErrors = 0
let errors = 0
let wordIndex = 0
let timeLimit = 10
let timer
let timeLeft = timeLimit
let currentInputLetter
let currentWord
let roundWinner
let winner

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
  // update UI to show time remaining for start of game
  timeRemaining.textContent = `${timeLimit}s Remaining`
  // setup the timer
  reset()
  // display a word
  updateWord()

  // run the function updateTimer every 1 sec => start new timers
  timer = setInterval(updateTimer, 1000)
}

// ===== reset =====
function reset(delay) {
  // if a truthy value (i.e true) is passed in then meanining it's the end of the round.. diable the input from typing and then after 1 sec undisable it and set the value to empty string
  if (delay) {
    inputEl.disabled = true
    setTimeout(() => {
      inputEl.disabled = false
      inputEl.value = ''
    }, 1000)
  }

  // reset the time to the start time limit
  timeLeft = timeLimit
  // clear the timer
  clearInterval(timer)
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

// ===== editTypedWord =====
// all this function does is edit the word to be typed by adding and removing css classes showing green for correctly tpyed letter and red for wrong letter typed
function editTypedWord() {
  currInput = inputEl.value
  const currInputArray = currInput.split('')

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

  // if the word being typed is the same as the given word
  if (currInput === currentWord) {
    inputEl.value = ''
    updateWord()
    correctWords++
    document
      .querySelector(`.player-${currentPlayer}`)
      .querySelector('.words').textContent = `Words Correct: ${correctWords}`
  }
}

// ===== updateTimer =====
function updateTimer() {
  // round in progress... countdown and display in UI
  if (timeLeft > 0) {
    timeLeft--
    countdownEl.textContent = `${timeLeft}s Remaining`
  }
  // time up... end of round
  else {
    // run reset function and pass in true for input manipulation after round
    reset(true)

    // if the current player is = to player0 then update player0's word count else update player1's word count
    currentPlayer === 0
      ? (playerWordCount[0] = correctWords)
      : (playerWordCount[1] = correctWords)

    // if the second player went then the round is over, so increment the round var
    // currentPlayer === 1 ? round++ : round

    if (currentPlayer === 1) {
      round++
      // find out who won the round
      roundWinner = playerWordCount[0] > playerWordCount[1] ? 0 : 1
      // increment the winners round won var
      roundsWon[roundWinner]++
      // update the UI to show the winner
      document
        .querySelector(`.player-${roundWinner}`)
        .querySelector(
          '.rounds-won'
        ).textContent = `Rounds Won: ${roundsWon[roundWinner]}`
      alert(`Player ${roundWinner + 1} won the round 🎉`)

      // if player has two wins.. they win the game.. game over
      if (roundsWon[0] === 2 || roundsWon[1] === 2) {
        let winner = roundsWon[0] === 2 ? 0 : 1
        gamesWon[winner]++
        alert(`Game Over: Player${winner + 1} Won 🎉`)
        document
          .querySelector(`.player-${winner}`)
          .querySelector('.games-won').textContent = `Games Won: ${
          gamesWon[winner++]
        }`
        // reset everything except the games won var
      }
    }

    // if the current player is 0 then change it to 1 else 0
    currentPlayer = currentPlayer === 0 ? 1 : 0
    // reset this var to be 0 for start of next round for next player
    correctWords = 0

    // replace word element text with the next player name
    wordEl.textContent = currentPlayer === 0 ? 'Player 1' : 'Player 2'

    // toggle css class to update UI to show current player
    player0El.querySelector('h3').classList.toggle('current-player')
    player1El.querySelector('h3').classList.toggle('current-player')

    // update the UI to show the current round
    roundEl.innerHTML = `<span>Round: </span> ${round}`
  }
}

// ===== event listeners =====
// listen for when user clicks/focuses into input
inputEl.addEventListener('focus', startRound)
// listen for input every change
inputEl.addEventListener('input', editTypedWord)
