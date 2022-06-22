const canvas = document.getElementById("board");
const whiteTakenCanvas = document.getElementById("whiteTaken");
const blackTakenCanvas = document.getElementById("blackTaken");

const infoBoardCanvas = document.getElementById("infoBoard");
const pawnPromotionCanvas = document.getElementById("pawnPromotion");

/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = self.ctx = canvas.getContext("2d");
/**
 * @type {CanvasRenderingContext2D}
 */
const wCtx = whiteTakenCanvas.getContext("2d");
Util.renderTakenPieces([], wCtx, "b");
/**
 * @type {CanvasRenderingContext2D}
 */
const bCtx = blackTakenCanvas.getContext("2d");
Util.renderTakenPieces([], bCtx, "w");

/**
 * @type {CanvasRenderingContext2D}
 */
const pCtx = pawnPromotionCanvas.getContext("2d");

/**
 * @type {CanvasRenderingContext2D}
 */
const iCtx = infoBoardCanvas.getContext("2d");
iCtx.fillStyle = "#23272A";
iCtx.fillRect(0, 0, infoBoardCanvas.width, infoBoardCanvas.height);
// Array.isEqual = function (this, array) {

//   if (this.length !== array.length) return false;

//   for (let i = 0; i < this.length; i++) {
//     if (array[i] !== this[i]) return false;
//   }
//   return true;
// }