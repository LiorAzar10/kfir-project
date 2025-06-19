// gameLogic.js

export class MemoryGame {
  constructor(cardSymbols) {
    this.cardSymbols = cardSymbols;
    this.matchedIndices = new Set();
    this.flippedIndices = [];
    this.moves = 0;
  }

  flipCard(index) {
    if (this.matchedIndices.has(index) || this.flippedIndices.includes(index)) {
      return { flipped: false };
    }

    this.flippedIndices.push(index);

    if (this.flippedIndices.length === 2) {
      this.moves++;

      const [i1, i2] = this.flippedIndices;
      const sym1 = this.cardSymbols[i1];
      const sym2 = this.cardSymbols[i2];

      if (sym1 === sym2) {
        this.matchedIndices.add(i1);
        this.matchedIndices.add(i2);
        this.flippedIndices = [];
        return { flipped: true, match: true, matchedIndices: [i1, i2] };
      } else {
        return { flipped: true, match: false, flippedIndices: [i1, i2] };
      }
    }

    return { flipped: true };
  }

  resetUnmatched() {
    this.flippedIndices = [];
  }

  isGameOver() {
    return this.matchedIndices.size === this.cardSymbols.length;
  }

  getMoves() {
    return this.moves;
  }
}
