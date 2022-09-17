// player 0 = player 1
// player 1 = player 2
// DOM Elements
const restartBtn = document.querySelector('.restart')
const player1El = document.querySelector('.player-0')
const player2El = document.querySelector('.player-1')
const roundEl = document.querySelector('.round')
const wordEl = document.querySelector('.word')
const inputEl = document.querySelector('.input')
const countdownEl = document.querySelector('#session-info').querySelector('p')
const timeRemaining = document.querySelector('#session-info').querySelector('p')

// vars to keep track of things
const URL = 'https://random-words-api.vercel.app/word' // random word
let round = 1 // keep track of each round
let playerWordCount = [0, 0] // keep track of each players correctly typed words
let roundsWon = [0, 0] // keep track of rounds won for each player
let gamesWon = [0, 0] // keep track of total games won for each player
let wordsCorrect = 0 // keey track of num of words typed correclty during the round
let currentPlayer = 0 // keep track of who is current player
let totalErrors = 0 // keep track of total errors
let errors = 0 // keep track of earch letter error
let wordIndex = 0 // which word are we on
let timeLimit = 10 // sets the time limit on timer
let timer // var for timer
let timeLeft = timeLimit // time left starts with the timelimite and then deincrements
let currentInputLetter // current letter typing
let currentWord // what is the current word
let roundWinner // who won the round
let winner // who won the game

// ===== RANDOM WORD API =====
function getRandomWord() {
  return fetch(URL)
    .then(res => res.json())
    .then(data => data[0].word)
}

// ===== UPDATE WORD =====
async function updateWord() {
  wordEl.textContent = null
  word = await getRandomWord()
}

// ===== PROCESS TEXT =====
function processText() {
  console.log('process text')
}

// ===== START GAME =====
function startGame() {
  console.log('start game')
}

// ===== UPDATE TIMER =====
function updateTimer() {
  console.log('update timer')
}

// ===== FINISH GAME =====
function finishGame() {
  console.log('finish game')
}

// ===== UPDATE ROUND =====
function updateRound() {
  console.log('update round')
}

// ===== UPDATE STATS =====
function updateStats() {
  console.log('update stats')
}
