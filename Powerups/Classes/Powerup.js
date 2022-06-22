class Powerup {
  x;
  y;
  name;
  image;
  description;
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
   */
  constructor(x, y, name, image, description, global) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.image = image;
    this.description = description;
    this.global = global;
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