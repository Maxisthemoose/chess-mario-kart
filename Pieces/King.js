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
  rookPosQueenMoved;
  /**
   * @type {[number, number]}
   * @private
   */
  rookPosKingMoved;

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
      this.rookPosKingMoved = [5, 7];
      this.rookPosQueenMoved = [3, 7];
      this.castleKing = [6, 7];
      this.castleQueen = [2, 7];
    } else {
      this.rookPosQueen = [0, 0];
      this.rookPosKing = [7, 0];
      this.rookPosKingMoved = [5, 0];
      this.rookPosQueenMoved = [3, 0];
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

    const [
      whiteQueenSide, whiteKingSide, blackQueenSide, blackKingSide
    ] = castleAbilities;

    const colorSpecificCastles = [this.color === "w" ? whiteQueenSide : blackQueenSide, this.color === "w" ? whiteKingSide : blackKingSide];

    // kingside
    if (colorSpecificCastles[1]) {
      const ksSpaces = this.color === "w" ? Util.wKingSideCastleOpen : Util.bKingSideCastleOpen;

      for (let i = 0; i < ksSpaces.length; i++) {
        const pieceInWay = Util.pieceAtCords(ksSpaces[i], pieces);
        if (pieceInWay !== undefined) break;
        if (i === ksSpaces.length - 1) moves.push(this.castleKing);
      }
    }


    // queenside
    if (colorSpecificCastles[0]) {
      const qsSpaces = this.color === "w" ? Util.wQueenSideCastleOpen : Util.bQueenSideCastleOpen;
      for (let i = 0; i < qsSpaces.length; i++) {
        const pieceInWay = Util.pieceAtCords(qsSpaces[i], pieces);
        if (pieceInWay !== undefined) break;
        if (i === qsSpaces.length - 1) moves.push(this.castleQueen);
      }
    }
    
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

    // castle move
    const kingSide = this.castleKing.isEqual(cords);
    const queenSide = this.castleQueen.isEqual(cords);
    if (kingSide || queenSide) {

      if (kingSide) {
        const kRook = Util.pieceAtCords(this.rookPosKing, pieces);
        console.log(pieces.find(p => p.x === this.rookPosKing[0] && p.y === this.rookPosKing[1]));
        console.log(pieces);
        kRook.move(this.rookPosKingMoved);
      } else if (queenSide) {
        const qRook = Util.pieceAtCords(this.rookPosQueen, pieces);
        qRook.move(this.rookPosQueenMoved);
      }
      this.x = cords[0];
      this.y = cords[1];
      this.hasMoved = true;
    } else 
      super.move(cords);
  }
}