class PromotionHandler {

  static canPromoteTo = {
    rook: Rook,
    knight: Knight,
    bishop: Bishop,
    queen: Queen,
  }
  
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

    // const take = document.getElementById("take");
    // console.log(take);
    // console.log(canvas, ctx.drawImage.toString());

    // ctx.drawImage(take, pawn.x * 100, pawn.y * 100, 100, 100);
    // ctx.fill()

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
    pCtx.fillStyle = "#363c40";
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
  static handleSelection(pawn) {
    
    pawnPromotionCanvas.onclick = function (ev) {
      const [x, y] = Util.getCursorPosition(pawnPromotionCanvas, ev);
      // rook, knight, bishop, queen, queen-end
      const xCords = [50, 150, 250, 350, 450];
      // +100 for bottom
      const yCord = 50;

      // rook
      if (y >= yCord && y <= yCord + 100) {
        /**
         * @type {Rook | Knight | Bishop | Queen}
         */
        let pieceToPromote;
        let type = "";
        if (x >= xCords[0] && x < xCords[1]) {
          pieceToPromote = PromotionHandler.canPromoteTo.rook;
          type = "r";
        } else if (x >= xCords[1] && x < xCords[2]) {
          pieceToPromote = PromotionHandler.canPromoteTo.knight;
          type = "n";
        } else if (x >= xCords[2] && x < xCords[3]) {
          pieceToPromote = PromotionHandler.canPromoteTo.bishop;
          type = "b";
        } else if (x >= xCords[3] && x < xCords[4]) {
          pieceToPromote = PromotionHandler.canPromoteTo.queen;
          type = "q";
        }
        if (pieceToPromote !== undefined) {
          /**
           * @type {Piece}
           */
          const piece = new pieceToPromote(pawn.x, pawn.y, type, pawn.color);
          game.pieces.replace((p) => p.type === pawn.type && p.x === pawn.x && p.y === pawn.y && p.color === pawn.color, piece);

          game.pieces.push(piece);

          game.board.updateCastleRights();
          game.board.render(game.powerupHandler);

          pCtx.fillStyle = "#23272A";
          pCtx.fillRect(0, 0, pawnPromotionCanvas.width, pawnPromotionCanvas.height);

          pawnPromotionCanvas.onclick = null;
          canvas.onclick = mainGame;
        }
      }
    }
  }
}