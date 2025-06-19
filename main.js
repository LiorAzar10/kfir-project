// main.js
import { MemoryGame } from './gameLogic.js';

const cardElements = Array.from(document.querySelectorAll('.card'));
const gameBoard = document.getElementById('gameBoard');
const movesEl = document.getElementById('moves');
const resetBtn = document.getElementById('resetBtn');

// Extract emoji symbols from DOM
let symbols = cardElements.map(card => card.dataset.card);
const game = new MemoryGame(symbols);

// Assign data-index to each card
cardElements.forEach((card, index) => {
  card.dataset.index = index;
  card.addEventListener('click', () => onCardClick(index, card));
});

function onCardClick(index, cardEl) {
  const result = game.flipCard(index);

  if (!result.flipped) return;

  cardEl.classList.add('flipped');
  movesEl.textContent = game.getMoves();

  if (result.match === false) {
    const [i1, i2] = result.flippedIndices;
    const c1 = cardElements[i1];
    const c2 = cardElements[i2];

    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      game.resetUnmatched();
    }, 1000);
  }

  if (game.isGameOver()) {
    setTimeout(() => alert(`🎉 You won in ${game.getMoves()} moves!`), 300);
  }
}

resetBtn.addEventListener('click', () => {
  window.location.reload();
});
