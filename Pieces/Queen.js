class Queen extends Piece {
  constructor(x, y, type, color) {
    super(x, y, type, color);
  }

  getMoves(pieces) {

    const tempRook = new Rook(this.x, this.y, "r", this.color);
    const tempBishop = new Bishop(this.x, this.y, "b", this.color);

    /**
     * @type {[number, number][]}
     */
    const moves = tempBishop.getMoves(pieces).concat(tempRook.getMoves(pieces));
    return moves;
  }
}