const game = new Game();

canvas.onclick = (ev) => {
  const [x, y] = Util.getCursorPosition(canvas, ev).map(v => floor100(v) / 100);

  if (game.selectedPiece === null) {
    const p = game.findPiece([x, y]);
    if (p === undefined) return;

    if (game.turn !== p.color) return;

    game.select(p);
    const moves = p.getMoves(game.pieces, game.castleRights);
    game.board.renderMoves(moves);
  } else {
    const allMoves = game.selectedPiece.getMoves(game.pieces, game.castleRights);
    const validSelected = allMoves.find(v => v[0] === x && v[1] === y);
    if (validSelected !== undefined) {

      const pieceThere = game.findPiece([x, y]);
      if (pieceThere && pieceThere.color !== game.turn) {
        const tookPiece = game.selectedPiece.take(pieceThere, game.pieces);
        
        if (tookPiece.color === "b") game.whiteTaken.push(tookPiece);
        else game.blackTaken.push(tookPiece);

        Util.renderTakenPieces(game.whiteTaken, wCtx, "b");
        Util.renderTakenPieces(game.blackTaken, bCtx, "w");
      }

      game.selectedPiece.move([x, y], game.castleRights);
      game.board.updateCastleRights();
      game.deselect();
      game.board.render();
      game.turn = game.turn === "w" ? "b" : "w";
    } else {
      const pieceThere = game.findPiece([x, y]);
      if (pieceThere && pieceThere.color === game.turn) {
        game.select(pieceThere);
        game.board.render();
        game.board.renderMoves(pieceThere.getMoves(game.pieces, game.castleRights));
        return;
      }
      game.deselect();
      game.board.render();
    }

  }
}

/**
 * @param {number} number 
 * @returns {number}
 */
function floor100(number) {
  return Math.floor(number / 100) * 100;
}