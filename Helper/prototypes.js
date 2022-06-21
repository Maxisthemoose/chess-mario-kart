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

/**
 * @template T
 * @param {Function} findFn 
 * @returns {T}
 */
Array.prototype.replace = function (findFn, replace) {
  if (this.length === 0) return undefined;
  const index = this.findIndex(findFn);
  const item = this.splice(index, 1, )[0];
  return item;
}