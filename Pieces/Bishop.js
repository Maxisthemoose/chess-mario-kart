class Bishop extends Piece {
  constructor(x, y, type, color) {
    super(x, y, type, color);
  }

  getMoves(pieces) {
    /**
     * @type {[number, number]}
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
        if (newMove[0] < 0 || newMove[0] > 7 || newMove[1] < 0 || newMove[1] > 7) break inner;
        else moves.push(newMove);
        i++;
      }
    }
    return moves;
  }
}