class Oneup extends Powerup {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    super(x, y, "Oneup", document.getElementById("Oneup"), "Prevents the piece from being taken for one turn", false, true);
  }
  use() {
    return true;
  }
}