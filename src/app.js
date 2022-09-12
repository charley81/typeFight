// all stats set to 0
// once user focus on input => countdown starts
// words appear and change as user types correctly
// when time is up the player correct var is updated and  other player goes
// once both players have gone the higher correct wins the round and their current wins var is updated
// once one player has two wins the win the game and their total wins var is updated
// the current wins var and correct var go back to zero and new game is started on focus again
const restartBtn = document.querySelector('.restart')
const player1 = document.querySelector('.player-1')
const player2 = document.querySelector('.player-2')
const round = document.querySelector('.round')
const word = document.querySelector('.word')
const input = document.querySelector('.input')

const words = [
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

input.addEventListener('focus', () => {
  console.log('user just focused on the input')
})
