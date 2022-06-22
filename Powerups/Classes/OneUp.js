class Oneup extends Powerup {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    super(x, y, "Oneup", document.getElementById("Oneup"), "Respawns the piece once it is taken.", false, true);
  }

  /**
   * @param {Piece} piece The piece that attacked the piece on the current square
   */
  use() {
    return true;
  }
}