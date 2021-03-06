class Util {

  static wQueenSideCastleOpen = [[1, 7], [2, 7], [3, 7]];
  static bQueenSideCastleOpen = [[1, 0], [2, 0], [3, 0]];

  static wKingSideCastleOpen = [[5, 7], [6, 7]];
  static bKingSideCastleOpen = [[5, 0], [6, 0]];

  /**
   * @param {Piece} piece 
   * @param {Piece[]} pieces 
   * @param {boolean[]} castleRights
   */
  static legalMoves(piece, pieces, castleRights) {

    /*

    MAKE SPECIAL CHECK CASE FOR KING CASTLEING
    CANT MOVE THROUGH CHECK

    */

    /**
     * @type {[number, number][]}
     */
    const legal = [];
    const king = pieces.find(p => p.type === "k" && p.color === piece.color);
    const oppPieces = pieces.filter(p => p.color !== piece.color);

    const pLoc = [piece.x, piece.y];
    const moves = piece.getMoves(pieces, castleRights);
    
    for (const m of moves) {
      const pieceThere = Util.pieceAtCords(m, pieces);
      let pieceTherePos = [];
      if (pieceThere !== undefined) {
        pieceTherePos = [pieceThere.x, pieceThere.y];

        pieceThere.x = null;
        pieceThere.y = null;
      }

      piece.x = m[0];
      piece.y = m[1];
      const checkAtNewPos = Util.inCheck(king, oppPieces, pieces, castleRights);
      if (!checkAtNewPos) legal.push(m);

      if (pieceThere !== undefined) {
        pieceThere.x = pieceTherePos[0];
        pieceThere.y = pieceTherePos[1];
      }

    }

    piece.x = pLoc[0];
    piece.y = pLoc[1];
    return legal;
  }

  /**
   * @param {Piece} king Current king
   * @param {Piece[]} pieces Opponents pieces
   * @param {Piece[]} allPieces All pieces
   * @param {boolean[]} castleRights
   */
  static inCheck(king, pieces, allPieces, castleRights) {
    const kingPos = [king.x, king.y];
    for (const piece of pieces) {
      const moves = piece.getMoves(allPieces, castleRights);
      for (const move of moves) {
        if (kingPos.isEqual(move)) return true;
      }
    }
    return false;
  }

  /**
   * @param {"w" | "b"} check 
   * @param {Piece[]} pieces 
   * @param {boolean[]} castleRights
   * @returns {"w" | "b" | boolean} The color that is checkmated
   */
  static inCheckmate(check, pieces, castleRights) {
    const piecesToCheck = pieces.filter(p => p.color === check);

    for (const piece of piecesToCheck) {
      const legalMoves = Util.legalMoves(piece, pieces, castleRights);
      if (legalMoves.length > 0) return false;
    }

    return check;
  }

  /**
   * @param {King} king 
   * @param {Piece[]} pieces 
   * @param {boolean[]} castleRights 
   * @returns {boolean}
   */
  static isDraw(king, pieces, castleRights) {
    const stale = Util.stalemate(king, pieces, castleRights);
    const insufficient = Util.isInsufficientMaterial(pieces);
    return stale || insufficient;
  }

  /**
   * @param {King} king
   * @param {Piece[]} pieces
   * @param {boolean[]} castleRights
   */
  static stalemate(king, pieces, castleRights) {
    const oppPieces = pieces.filter(p => p.color !== king.color && p.type !== "k");
    const kingLegal = Util.legalMoves(king, pieces, castleRights);
    const kingInCheck = Util.inCheck(king, oppPieces, pieces, castleRights);
    if (kingLegal.length === 0 && !kingInCheck) {
      const sameColorPieces = pieces.filter(p => p.color === king.color && p.type !== "k");
      let legalMoves = [];
      for (const p of sameColorPieces) {
        const legalForPiece = Util.legalMoves(p, pieces, castleRights);
        legalMoves = legalMoves.concat(legalForPiece);
      }
      if (legalMoves.length === 0) return true;
    }
  }

  // I hate this function. Truly
  /**
   * @param {Piece[]} pieces 
   */
  static isInsufficientMaterial(pieces) {
    const whitePieces = pieces.filter(p => p.color === "w");
    const blackPieces = pieces.filter(p => p.color === "b");
    const wLen = whitePieces.length;
    const bLen = blackPieces.length;

    if (!whitePieces.find(p => p.type === "p") && !blackPieces.find(p => p.type === "p")) {
      if (wLen <= 3 && bLen <= 3) {
        if (wLen < 3 && bLen < 3) {
          if (!whitePieces.find(p => p.type === "r")
            && !blackPieces.find(p => p.type === "r")
            && !whitePieces.find(p => p.type === "q")
            && !blackPieces.find(p => p.type === "q")) return true;
          else return false;
        } else if (wLen === 1 && bLen === 3) {
          if (blackPieces.filter(p => p.type === "n").length === 2) return true;
          else return false;
        } else if (wLen === 3 && bLen === 1) {
          if (whitePieces.filter(p => p.type === "n").length === 2) return true;
          else return false;
        } else return false;
      } else return false;
    } else return false;     

  }

  /**
   * @param {[number, number]} cords 
   * @param {Piece[]} pieceArray 
   * @returns {Piece}
   */
  static pieceAtCords(cords, pieceArray) {
    const p = pieceArray.find(p => p.x === cords[0] && p.y === cords[1])
    if (p !== undefined) return p;
    else return undefined;
  }

  /**
   * Gets the x, y cords on the given canvas element where clicked
   * @param {HTMLCanvasElement} canvas 
   * @param {MouseEvent} event 
   * @returns {[number, number]}
   */
  static getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return [x, y];
  }

  /**
   * @param {Piece[]} pieces 
   * @param {CanvasRenderingContext2D} ctx
   * @param {"w" | "b"} color Color of pieces in pieces array
   */
  static renderTakenPieces(pieces, ctx, color) {
    if (color === "w") ctx.fillStyle = "#141414";
    else if (color === "b") ctx.fillStyle = "#dedede";

    Util.roundRect(ctx, 0, 0, 800, 75, 15);
    ctx.fill();

    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i];
      const image = document.getElementById(piece.color + piece.type);
      ctx.drawImage(image, i * 50, 10, 55, 55);
    }
  }

  /**
   * creates a rectangle at the given position with corners of radius r
   * @link https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
   * used second answer
   * @param {CanvasRenderingContext2D} ctx the current rendering context to use
   * @param {number} x start x position
   * @param {number} y start y position
   * @param {number} w rectangle width
   * @param {number} h rectangle height
   * @param {number} r the radius for the rounded corners
   */
  static roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /**
   * @link https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
   * @param {CanvasRenderingContext2d} ctx 
   * @param {string} text 
   * @param {number} maxWidth  
   */
  static getLines(ctx, text, maxWidth) {
    let words = text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      let word = words[i];
      let width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

}