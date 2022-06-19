class Rook extends Piece {
  constructor(x, y, type, color) {
    super(x, y, type, color);
  }

  /**
   * @param {Piece[]} pieces  
   */
  getMoves(pieces) {
    /**
     * @type {[number, number]}
     */
    const moves = [];

    const distToEdges = [this.y, 7 - this.x, 7 - this.y, this.x];

    for (let d = 0; d < distToEdges.length; d++) {
      inner: for (let i = 1; i < distToEdges[d] + 1; i++) {
        let newCords;
        if (d === 0)
          newCords = [this.x, this.y - i];
        else if (d === 1)
          newCords = [this.x + i, this.y];
        else if (d === 2)
          newCords = [this.x, this.y + i];
        else if (d === 3)
          newCords = [this.x - i, this.y];

        console.log(newCords, [this.x, this.y]);
        const pieceInLocation = pieces.find(v => v.x === newCords[0] && v.y === newCords[1]);
        console.log(pieceInLocation)
        if (!pieceInLocation) moves.push(newCords);
        else if (pieceInLocation.color !== this.color) {
          moves.push(newCords);
          break inner;
        } else break inner;
      }
    }

    return moves;

  }
}