class PromotionHandler {

  static canPromoteTo = {
    rook: Rook,
    knight: Knight,
    bishop: Bishop,
    queen: Queen,
  }

  // /**
  //  * @type {Pawn[]}
  //  */
  // static blackPawns;
  // /**
  //  * @type {Pawn[]}
  //  */
  // static whitePawns;
  // /**
  //  * @param {Piece[]} pieces 
  //  */
  // constructor(pieces) {

  // }
  
  /**
   * @param {Pawn} pawn 
   */
  static checkPromotion(pawn) {
    const yPosForPromotion = pawn.color === "w" ? 0 : 7;
    if (pawn.y === yPosForPromotion) {
      PromotionHandler.promote(pawn);
      return true;
    }
    return false;
  }
  /**
   * @param {Pawn} pawn 
   */
  static promote(pawn) {
    PromotionHandler.renderChoices(pawn.color);
    PromotionHandler.handleSelection(pawn);
  }
  /**
   * @param {"w" | "b"} color 
   */
  static renderChoices(color) {
    canvas.onclick = null;
    const image = document.getElementById("promotion");
    Util.roundRect(pCtx, 0, 0, 500, 200, 20);
    pCtx.fill();
    pCtx.drawImage(image, 50, 50, 400, 100);

    const rookImage = document.getElementById(color + "r");
    const knightImage = document.getElementById(color + "n");
    const bishopImage = document.getElementById(color + "b");
    const queenImage = document.getElementById(color + "q");

    pCtx.drawImage(rookImage, 50, 50, 100, 100);
    pCtx.drawImage(knightImage, 150, 50, 100, 100);
    pCtx.drawImage(bishopImage, 250, 50, 100, 100);
    pCtx.drawImage(queenImage, 350, 50, 100, 100);
    
  }

  /**
   * @param {Pawn} pawn 
   */
  static handleSelection(pawn) { }
 
}