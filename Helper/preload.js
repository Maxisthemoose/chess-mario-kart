const canvas = document.getElementById("board");
const whiteTakenCanvas = document.getElementById("whiteTaken");
const blackTakenCanvas = document.getElementById("blackTaken");
/**
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext("2d");
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




// Array.isEqual = function (this, array) {

//   if (this.length !== array.length) return false;

//   for (let i = 0; i < this.length; i++) {
//     if (array[i] !== this[i]) return false;
//   }
//   return true;
// }