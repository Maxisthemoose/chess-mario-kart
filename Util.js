class Util {
  /**
   * @param {[number, number]} cords 
   * @param {Piece[]} pieceArray 
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
   */
  static renderTakenPieces(pieces, ctx) {
    // ctx.clearRect(0, 0, 800, 100);
    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i];
      console.log(piece);
      const image = document.getElementById(piece.color + piece.type);
      ctx.drawImage(image, i * 50, 25, 50, 50);
    }
  }
}