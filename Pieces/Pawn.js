class Pawn extends Piece {
  // -1 or 1
  /**
   * @type {-1 | 1}
   */
  moveDirection;
  constructor(x, y, type, color) {
    super(x, y, type, color);
    this.moveDirection = this.color === "w" ? -1 : 1;
  }
  getMoves(pieces) {
    const moves = [];
    const onePosAhead = [this.x, this.y + this.moveDirection];
    const diagonalMoves = [
      [this.x - 1, this.y + this.moveDirection],
      [this.x + 1, this.y + this.moveDirection],
    ];

    if (this.hasMoved) {
      return diagonalMoves.concat([onePosAhead]);  
    } else {
      const twoAhead = [this.x, this.y + (this.moveDirection * 2)];
      return diagonalMoves.concat([onePosAhead]).concat([twoAhead]);
    }
  }
}