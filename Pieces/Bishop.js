class Bishop extends Piece {
  constructor(x, y, type, color) {
    super(x, y, type, color);
  }

  getMoves(pieces) {
    /**
     * @type {[number, number][]}
     */
    const moves = [];
    const directions = [
      [-1, -1], // left, up
      [1, -1], // right, up
      [-1, 1], // left, down
      [1, 1], // right, down
    ];
    for (const direction of directions) {
      let i = 1;
      inner: while (true) {
        const newMove = [this.x + (i * direction[0]), this.y + (i * direction[1])];
        const pieceInLocation = Util.pieceAtCords(newMove, pieces);
        if (newMove[0] < 0 || newMove[0] > 7 || newMove[1] < 0 || newMove[1] > 7) break inner;
        else if (!pieceInLocation) moves.push(newMove);
        else if (pieceInLocation && pieceInLocation.color === this.color) break inner;
        else if (pieceInLocation && pieceInLocation.color !== this.color) {
          moves.push(newMove);
          break inner;
        }
        i++;
      }
    }
    return moves;
  }
}