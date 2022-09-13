// fetching word from api
function getWord() {
  fetch('https://random-words-api.vercel.app/word')
    .then(res => res.json())
    .then(data => {
      wordEl.innerHTML = data[0].word
    })
}
