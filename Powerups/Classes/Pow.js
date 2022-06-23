class Pow extends Powerup {
  constructor(x, y) {
    super(x, y, "Pow", document.getElementById("Pow"), "Stuns the opponents side, giving you an extra turn", false, false);
  }
  use() {
    game.stunned = true;
  }
}