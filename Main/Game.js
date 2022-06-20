class Game {
  board = new Board();
  // turn = "w";
  /**
   * @type {null | Piece}
   */
  selectedPiece = null;

  /**
   * Array of all pieces white has took from black 
   * Array should contain black pieces
   * @type {Piece[]}
   */
  whiteTaken = [];

  /**
   * Array of all pieces black has took from white
   * Array should contain white pieces
   * @type {Piece[]}
   */
  blackTaken = [];

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

  get pieces() {
    return this.board.pieces;
  }

  get castleRights() {
    return this.board.castleRights;
  }

  get turn() {
    return this.board.turn;
  }

  /**
   * @param {"w" | "b"} turn
   */
  set turn(turn) {
    this.board.turn = turn;
  }

}
