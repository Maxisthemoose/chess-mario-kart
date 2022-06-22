class PowerupHandler {

  static allPowerups = [
    Oneup,
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
    console.log(PowerupHandler.allPowerups);
    // 30% chance powerup spawns on move
    const random = Math.random();
    if (random <= 0.3 && this.powerups.length < 3) this.spawnPowerup();

    const powerupAtLocation = this.powerups.find(power => power.x === piece.x && power.y === piece.y);
    if (powerupAtLocation !== undefined) this.handlePickup(piece, powerupAtLocation);
  }

  /**
   * @param {Piece} piece 
   * @param {Powerup} powerup
   */
  handlePickup(piece, powerup) {
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
    console.log(randomPowerup)

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

}