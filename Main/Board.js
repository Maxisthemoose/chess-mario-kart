class Board {
  size = 800;
  turn = "w";
  cell = this.size / 8;
  /**
   * @type {Piece[]}
   */
  pieces = [];
  // http://www.netreal.de/Forsyth-Edwards-Notation/index.php
  fen = "3pkp2/8/p7/1Q6/8/8/8/3PKP2 b KQkq - 0 1";
  // KQkq === true, true, true, true
  // Qkq === false, true, true, true
  // Kk === false, true, false, true
  castleRights = [true, true, true, true];
  /**
   * @private
   */
  pieceMap = { "p": Pawn, "r": Rook, "n": Knight, "b": Bishop, "q": Queen, "k": King };

  constructor() {
    this.setup();
  }

  /**
   * @private
   */
  setup() {
    const fenComponents = this.fen.split(" ");
    for (let i = 0; i < fenComponents.length; i++) {
      if (i === 0) {
        const fenOnePieces = fenComponents[i].split("/");
        y: for (let y = 0; y < fenOnePieces.length; y++) {
          let pieces = fenOnePieces[y].split("");
          let actualX = 0;
          for (let x = 0; x < pieces.length; x++) {
            const piece = pieces[x];
            if (!isNaN(parseInt(piece))) {
              actualX += parseInt(piece);
              continue;
            }
            const color = piece.toLowerCase() === piece ? "b" : "w";
            this.pieces.push(new this.pieceMap[piece.toLowerCase()](actualX, y, piece.toLowerCase(), color));
            actualX++;
          }
        }
      } else if (i === 1) this.turn = fenComponents[i];
      else if (i === 2) {
        const components = fenComponents[i].split("");

      }
    }
  }

  updateCastleRights() {
    const wRooks = this.pieces.filter(p => p.color === "w" && p.type === "r");
    const bRooks = this.pieces.filter(p => p.color === "b" && p.type === "r");

    const wKing = this.pieces.find(p => p.color === "w" && p.type === "k");
    const bKing = this.pieces.find(p => p.color === "b" && p.type === "k");

    if (wKing.hasMoved) {
      this.castleRights[0] = false;
      this.castleRights[1] = false;
    }
    if (bKing.hasMoved) {
      this.castleRights[2] = false;
      this.castleRights[3] = false;
    }

    if (wRooks[1]?.hasMoved) this.castleRights[0] = false;
    if (wRooks[0]?.hasMoved) this.castleRights[1] = false;

    if (bRooks[1]?.hasMoved) this.castleRights[2] = false;
    if (bRooks[0]?.hasMoved) this.castleRights[3] = false;
  }

  render() {
    canvas.width = this.size;
    canvas.height = this.size;

    const boardImage = document.getElementById("boardImage");
    ctx.drawImage(boardImage, 0, 0, 800, 800);

    for (const piece of this.pieces) {
      const pieceImage = document.getElementById(piece.color + piece.type);
      ctx.drawImage(pieceImage, piece.x * this.cell, piece.y * this.cell, this.cell, this.cell);
    }
  }

  /**
   * 
   * @param {[number, number][]} moves 
   */
  renderMoves(moves) {
    const img = document.getElementById("move");
    const take = document.getElementById("take");

    for (const m of moves) {
      const p = this.pieces.find(v => v.x === m[0] && v.y === m[1]);
      if (p !== undefined) ctx.drawImage(take, m[0] * this.cell, m[1] * this.cell, this.cell, this.cell)
      else ctx.drawImage(img, m[0] * this.cell, m[1] * this.cell, this.cell, this.cell);
    }
  }
}