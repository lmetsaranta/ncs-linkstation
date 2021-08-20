/**
 * @param {number} x X-coordinate of the linkstation.
 * @param {number} y Y-coordinate of the linkstation.
 * @param {number} r Reach of the linkstation.
 */

module.exports = function Linkstation(x, y, r) {
  this.x = x;
  this.y = y;
  this.reach = r;
}
