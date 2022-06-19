class Piece {
  hasMoved = false;
  x;
  y;
  type;
  color;

  /**
   * @type {*}
   * @private
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
    this.type = type;
    this.color = color;
  }

  /**
   * @param {Piece[]} pieces 
   * @returns {[number, number][] | null}
   */
  getMoves(pieces) {}
  

  pickupPowerup(powerup) {
    this.powerup = powerup;
  }

  activatePowerup() {
    // this.powerup.use(this);
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
}