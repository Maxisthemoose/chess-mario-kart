class PowerupHandler {

  static allPowerups = [
    Oneup,
    Pow,
  ];

  /**
   * @type {Piece[]}
   */
  pieces;
  /**
   * @type {Powerup[]}
   */
  powerups = [];
  /**
   * @param {Piece[]} pieces 
   */
  constructor(pieces) {
    this.pieces = pieces;
  }

  /**
   * @param {Piece} piece 
   */
  onMove(piece) {
    // 10% chance powerup spawns on move
    const random = Math.random();
    if (random <= 1 && this.powerups.length < 2) this.spawnPowerup();

    // should implement some kind of rarity system for spawning certain powerups.

    const powerupAtLocation = this.powerups.find(power => power.x === piece.x && power.y === piece.y);
    if (powerupAtLocation !== undefined) this.handlePickup(piece, powerupAtLocation);
  }

  /**
   * @param {Piece} piece 
   * @param {Powerup} powerup
   */
  handlePickup(piece, powerup) {
    if (piece.powerup !== undefined) return;
    this.powerups.splice(this.powerups.findIndex(pow => pow.x === powerup.x && pow.y === powerup.y), 1);
    piece.pickupPowerup(powerup);
  }

  /**
   * @private
   */
  spawnPowerup() {
    const cantSpawn = this.pieces.map((v) => [v.x, v.y]);
    for (const p of this.powerups) cantSpawn.push([p.x, p.y]);

    const available = [];

    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (cantSpawn.find(v => v[0] === x && v[1] === y)) continue;
        else available.push([x, y]);
      }
    }

    const randomSquare = available[Math.floor(Math.random() * available.length)];
    const randomPowerup = PowerupHandler.allPowerups[Math.floor(Math.random() * PowerupHandler.allPowerups.length)];
    this.powerups.push(new randomPowerup(randomSquare[0], randomSquare[1]));
  }


  // for powerups like OneUp (auto use)
  /**
   * @param {Piece} piece 
   */
  onTake(piece) {
    if (piece.powerup?.name === "Oneup") {
      const used = piece.powerup.use();
      piece.powerup = undefined;
      return used;
    }
  }

  renderInfoboard() {
    const piece = game.selectedPiece;
    const ctx = iCtx;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const powerup = piece.powerup;

    if (powerup === undefined) return;

    ctx.fillStyle = "#363c40";
    Util.roundRect(ctx, 0, 0, width, height, 30);
    ctx.fill();
    ctx.drawImage(powerup.image, (width / 2) - 50, 25, 100, 100);
    const pieceImage = document.getElementById(piece.color + piece.type);
    ctx.drawImage(pieceImage, 25, 25, 75, 75);

    ctx.font = "bold 35px Courier New";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FAF9F6";
    ctx.fillText(powerup.name, width / 2, height / 2.5)

    ctx.font = "18px Courier New";

    const lines = Util.getLines(ctx, powerup.description, width - 50);
    const startY = height / 2;
    for (let y = 0; y < lines.length; y++) {
      ctx.fillText(lines[y], width / 2, startY + y * 25);
    }

    ctx.font = "bold 26px Courier New";

    if (!powerup.passive) {

      const text = `🟢 Use ${powerup.name}`;
      const textWidth = ctx.measureText(text).width;

      const xStart = width / 2 - (textWidth / 2);
      const yStart = height / 1.5;

      ctx.fillStyle = "#171a1d";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;


      Util.roundRect(ctx, xStart - 10, yStart, textWidth + 25, 50, 10);
      ctx.fill();
      ctx.stroke();
      ctx.textAlign = "left";
      ctx.fillStyle = "white";      
      ctx.fillText(text, xStart, yStart + 35);

      this.handleUseButton(powerup, { x: xStart - 10, y: yStart, wx: textWidth + 25, wy: yStart + 50 });
      piece.powerup = undefined;

    } else 
      ctx.fillText("🟢 Passive Powerup", width / 2, height / 1.25);
  
  }

  /**
   * @param {Powerup} powerup 
   * @param {{
   * x: number;
   * y: number;
   * wx: number;
   * wy: number;
   * }} buttonData 
   */
  handleUseButton(powerup, buttonData) {
    infoBoardCanvas.onclick = function (ev) {
      const [x, y] = Util.getCursorPosition(infoBoardCanvas, ev);
      if (x >= buttonData.x && x <= buttonData.wx && y >= buttonData.y && y <= buttonData.wy) {
        powerup.use();
        game.powerupHandler.clearInfoboard();
        console.log("done");
        infoBoardCanvas.onclick = null;
      }
    }
  }

  clearInfoboard() {
    iCtx.fillStyle = "#23272A";
    iCtx.fillRect(0, 0, iCtx.canvas.width, iCtx.canvas.height);
  }

}