class Util {
  /**
   * 
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
}