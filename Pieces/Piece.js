class Piece {
  hasMoved = false;
  x;
  y;
  type;
  color;

  /**
   * @type {number}
   * @private
   */
  startX;
  /**
   * @type {number}
   * @private 
   */
  startY;

  /**
   * @type {Powerup}
   */
  powerup;
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {"p" | "r" | "n" | "b" | "q" | "k"} type 
   * @param {"b" | "w"} color 
   */
  constructor(x, y, type, color) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.type = type;
    this.color = color;
  }

  /**
   * @param {Piece[]} pieces 
   * @returns {[number, number][] | null}
   */
  getMoves(pieces) {}
  

  /**
   * 
   * @param {Powerup} powerup 
   */
  pickupPowerup(powerup) {
    this.powerup = powerup;
  }

  // Checking for a valid move should be a function of the board, not the pieces job.
  /**
   * @param {[number, number]} cords
   * @returns {void}
   */
  move(cords) {
    this.hasMoved = true;
    this.x = cords[0];
    this.y = cords[1];
  }

  /**
   * @param {Piece} piece 
   * @param {Piece[]} pieces
   * @returns {Piece} the piece that was taken
   */
  take(piece, pieces) {
    if (piece.color === this.color) return null;
    const index = pieces.findIndex(p => p.x === piece.x && p.y === piece.y);
    pieces.splice(index, 1);
    piece.x = null;
    piece.y = null;
    return piece;
  }
}