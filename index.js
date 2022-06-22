const game = new Game();

canvas.onclick = mainGame;

function mainGame(ev) {
  const [x, y] = Util.getCursorPosition(canvas, ev).map(v => floor100(v) / 100);
  if (game.selectedPiece === null) {
    const p = game.findPiece([x, y]);

    if (p === undefined) return;
    if (game.turn !== p.color) return;

    game.select(p);

    game.powerupHandler.renderInfoboard();

    const moves = Util.legalMoves(p, game.pieces, game.castleRights);
    game.board.renderMoves(moves);

  } else {
    const allMoves = Util.legalMoves(game.selectedPiece, game.pieces, game.castleRights);
    const validSelected = allMoves.find(v => v[0] === x && v[1] === y);
    if (validSelected !== undefined) {
      const pieceThere = game.findPiece([x, y]);
      let oneupUsed = false;
      ifbreak: if (pieceThere && pieceThere.color !== game.turn) {

        if (game.powerupHandler.onTake(pieceThere)) {
          oneupUsed = true;
          break ifbreak;
        }
        const tookPiece = game.selectedPiece.take(pieceThere, game.pieces);
        
        if (tookPiece.color === "b") game.whiteTaken.push(tookPiece);
        else game.blackTaken.push(tookPiece);

        Util.renderTakenPieces(game.whiteTaken, wCtx, "b");
        Util.renderTakenPieces(game.blackTaken, bCtx, "w");
      }
      if (!oneupUsed) {
        game.selectedPiece.move([x, y], game.pieces, ctx);

        game.powerupHandler.onMove(game.selectedPiece);
      }

      game.board.updateCastleRights();
      game.deselect();
      game.board.render(game.powerupHandler);
      game.powerupHandler.clearInfoboard();

      game.turn = game.turn === "w" ? "b" : "w";
      
      const king = game.pieces.find(p => p.color === game.turn && p.type === "k");
      const draw = Util.isDraw(king, game.pieces, game.castleRights);

      if (draw) {
        alert("DRAW");
        canvas.onclick = null;
      }

      const checkmate = Util.inCheckmate(game.turn, game.pieces, game.castleRights);
      if (checkmate) {
        alert(checkmate + " was checkmated");
        canvas.onclick = null;
      }
    } else {
      game.powerupHandler.clearInfoboard();
      const pieceThere = game.findPiece([x, y]);
      if (pieceThere && pieceThere.color === game.turn) {
        game.select(pieceThere);
        game.board.render(game.powerupHandler);
        game.board.renderMoves(Util.legalMoves(pieceThere, game.pieces, game.castleRights));
        game.powerupHandler.renderInfoboard();
        return;
      }
      game.deselect();
      game.board.render(game.powerupHandler);
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