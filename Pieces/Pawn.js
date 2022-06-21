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
  /**
   * 
   * @param {Piece[]} pieces 
   * @returns 
   */
  getMoves(pieces) {
    /**
     * @type {[number, number][]}
     */
    const moves = [];
    const onePosAhead = [this.x, this.y + this.moveDirection];
    const twoAhead = [this.x, this.y + (this.moveDirection * 2)];
    const diagonalMoves = [
      [this.x - 1, this.y + this.moveDirection],
      [this.x + 1, this.y + this.moveDirection],
    ];

    for (const m of diagonalMoves) {
      const pInLoc = Util.pieceAtCords(m, pieces);
      if (pInLoc === undefined) continue;
      if (pInLoc.color !== this.color) moves.push(m);
    }
    const oneMoveLocation = Util.pieceAtCords(onePosAhead, pieces);
    const twoMoveLocation = Util.pieceAtCords(twoAhead, pieces);

    if (oneMoveLocation === undefined) moves.push(onePosAhead);
    if (!this.hasMoved && twoMoveLocation === undefined && oneMoveLocation === undefined) moves.push(twoAhead);

    return moves;
  }

  move(cords) {
    super.move(cords);

    PromotionHandler.checkPromotion();

  }

}