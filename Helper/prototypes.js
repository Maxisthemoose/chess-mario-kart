/**
 * @template T

 * @param {T[]} array
 * @returns {boolean}
 */
Array.prototype.isEqual = function (array) {

  if (this.length !== array.length) return false;

  for (let i = 0; i < this.length; i++) {
    if (array[i] !== this[i]) return false;
  }
  return true;
}