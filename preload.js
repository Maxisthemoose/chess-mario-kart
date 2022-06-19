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
/**
 * @type {CanvasRenderingContext2D}
 */
const bCtx = blackTakenCanvas.getContext("2d");