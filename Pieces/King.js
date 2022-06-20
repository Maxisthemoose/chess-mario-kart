class King extends Piece {

  /**
   * @type {[number, number]}
   * @private
   */
  rookPosQueen;
  /**
   * @type {[number, number]}
   * @private
   */
  rookPosKing;
  /**
   * @type {[number, number]}
   * @private
   */
  castleQueen;
  /**
   * @type {[number, number]}
   * @private
   */
  castleKing;

  // i really dont want to make this
  constructor(x, y, type, color) {
    super(x, y, type, color);

    if (this.color === "w") {
      this.rookPosQueen = [0, 7];
      this.rookPosKing = [7, 7];
      this.castleKing = [6, 7];
      this.castleQueen = [2, 7];
    } else {
      this.rookPosQueen = [0, 0];
      this.rookPosKing = [7, 0];
      this.castleKing = [6, 0];
      this.castleQueen = [2, 0];
    }
  }

  /**
   * @param {Piece[]} pieces 
   * @param {boolean[]} castleAbilities
   */
  getMoves(pieces, castleAbilities) {
    /**
     * @type {[number, number][]}
     */
    const moves = [];
    const oneAwayMoves = [
      [-1, 1], // left, down
      [0, 1], // down
      [1, 1], // right, down
      [-1, -1], // left, up
      [0, -1], // up
      [1, -1], // right, up
      [1, 0], // right
      [-1, 0], // left
    ];

    for (const move of oneAwayMoves) {
      const temp = [this.x + move[0], this.y + move[1]];
      const pieceAtLocation = Util.pieceAtCords(temp, pieces);
      if (temp[0] > 7 || temp[0] < 0 || temp[1] > 7 || temp[1] < 0) continue;
      if (pieceAtLocation === undefined) moves.push(temp);
      else if (pieceAtLocation.color === this.color) continue;
      else moves.push(temp);
    }

    console.log(castleAbilities);

    // get normal moves first
    // dont forget to make sure theres no pieces in the way
    // possible mark of castle move in move cords somehow
    // maybe just make move function know those specific castle moves and behave accordingly

    return moves;
  }

  // king will require its own move function because the king is a bitch
  /**
   * 
   * @param {[number, number][]} cords 
   * @param {Piece[]} pieces 
   */
  move(cords, pieces) {

  }
}