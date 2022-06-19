class Game {
  board = new Board();
  turn = "w";
  /**
   * @type {null | Piece}
   * @private
   */
  selectedPiece = null;
  constructor() {
    this.board.render();
  }

  /**
   * @param {[number, number]} cords 
   * @returns {Piece | undefined}
   */
  findPiece(cords) {
    const piece = this.board.pieces.find((v) => v.x === cords[0] && v.y === cords[1]);
    return piece;
  }

  /**
   * @param {Piece} piece 
   */
  select(piece) {
    this.selectedPiece = piece;
  }

  deselect() {
    this.selectedPiece = null;
  }

  get selectedPiece() {
    return this.selectedPiece;
  }

}
