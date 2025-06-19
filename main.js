// main.js
import { MemoryGame } from './gameLogic.js';

const movesEl = document.getElementById('moves');
const resetBtn = document.getElementById('resetBtn');
const gameBoard = document.getElementById('gameBoard');

const emojiPairs = ['🍕','🐶','🌈','🚀','🦄','🍩','🐱','🎈'];
const shuffledSymbols = shuffle([...emojiPairs, ...emojiPairs]); // 8 pairs = 16 total

const game = new MemoryGame(shuffledSymbols);
const cardElements = [];

shuffledSymbols.forEach((symbol, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.card = symbol;
  card.dataset.index = index;

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">❓</div>
      <div class="card-back">${symbol}</div>
    </div>
  `;

  card.addEventListener('click', () => onCardClick(index, card));
  cardElements.push(card);
  gameBoard.appendChild(card);
});

let busy = false;

function onCardClick(index, cardEl) {
  if (busy) return; // ignore clicks while busy

  const result = game.flipCard(index);
  if (!result.flipped) return;

  cardEl.classList.add('flipped');
  movesEl.textContent = game.getMoves();

  if (result.match === false) {
    busy = true; // block further clicks until timeout ends

    const [i1, i2] = result.flippedIndices;
    const c1 = cardElements[i1];
    const c2 = cardElements[i2];

    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      game.resetUnmatched();
      busy = false; // release lock
    }, 1000);
  }

  if (game.isGameOver()) {
    setTimeout(() => alert(`🎉 You won in ${game.getMoves()} moves!`), 300);
  }
}

resetBtn.addEventListener('click', () => {
  window.location.reload();
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
