class Knight extends Piece {
  constructor(x, y, type, color) {
    super(x, y, type, color);
  }

  getMoves(pieces) {
    /**
     * @type {[number, number][]}
    */
    const moves = [];
    const arrOfMoves = [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]];
    for (const m of arrOfMoves) {
      const tempMove = [this.x + m[0], this.y + m[1]];

      const pieceInLocation = Util.pieceAtCords(m, pieces);

      if (tempMove[0] > 7 || tempMove[0] < 0 || tempMove[1] > 7 || tempMove[1] < 0) continue;
      else if (pieceInLocation !== undefined && pieceInLocation.color !== this.color) moves.push(tempMove);
      else if (pieceInLocation === undefined) moves.push(tempMove);
    }
    return moves;
  }
}