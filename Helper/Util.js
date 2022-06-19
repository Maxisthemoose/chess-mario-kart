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
  static renderTakenPieces(pieces, ctx, color) {
    if (color === "w") ctx.fillStyle = "black";
    else if (color === "b") ctx.fillStyle = "white";

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
}