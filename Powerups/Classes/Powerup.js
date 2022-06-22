class Powerup {
  x;
  y;
  name;
  image;
  description;
  passive;
  global;
  piece;
  /**
   * @param {number} x
   * @param {number} y
   * @param {string} name 
   * @param {HTMLImageElement} image 
   * @param {string} description 
   * @param {boolean} global 
   * @param {Piece | undefined} piece 
   * @param {boolean} passive
   */
  constructor(x, y, name, image, description, global, passive) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.image = image;
    this.description = description;
    this.global = global;
    this.passive = passive;
  }
  use() { }
  
  /**
   * @param {Piece} piece 
   * @returns 
   */
  pickup(piece) {
    if (this.global) return this;
    else this.piece = piece; 

    return true;
  }
}