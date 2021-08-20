let linkstations = require("./assets/linkstations");
let devices = require("./assets/devices");

/** pythagoras theorem a² + b² = c²
 *
 * @param {number} x1 X-coordinate of point 1
 * @param {number} y1 Y-coordinate of point 1
 * @param {number} x2 X-coordinate of point 2
 * @param {number} y2 Y-coordinate of point 2
 * @returns {number} Distance between two points
 */
const distanceBetweenTwoPoints = (x1, y1, x2, y2) => {
  let a = x1 - x2;
  let b = y1 - y2;

  return Math.sqrt(a * a + b * b);
};

/**
 *  power = (reach - device's distance from linkstation)²
 *  @param {Object} device Device object with x & y coordinates
 * @param {Object} linkstation Linkstation object with x & y coordinates and reach of the station
 * @returns {number} Power of the best linkstation or 0 if no linkstation within reach
 */
const power = (device, linkstation) => {
  let dist = distanceBetweenTwoPoints(device.x, device.y, linkstation.x, linkstation.y);

// if distance > reach, power = 0
  if(dist > linkstation.reach) {
    return 0;
  } else {
    return (linkstation.reach - dist) ** 2;
  }
};

/**
 *  Main function to calculate best linkstation for the device
 *  @param {Object.<stationArray[]>} linkstations Array of linkstations available
 *  @param {Object} device Device object with x & y coordinates
 *  @returns {string} Output string of reachable station or no station within reach
 */
const main = (linkstations, device) => {
  let pow = 0;
  let bestStation;

  linkstations.stationArray.map((station) => {
    let p = power(device, station);
      if(p > pow) {
        pow = p;
        bestStation = station;
      }
  });

  if(pow === 0) {
    return `No link station within reach for point ${device.x},${device.y}`;
  } else {
    return `Best link station for point ${device.x},${device.y} is ${bestStation.x},${bestStation.y} with power ${pow.toFixed(2)}`;
  }
};

// Run example output for predefined devices
devices.deviceArray.map((device) => {
  console.log(main(linkstations, device));
});

module.exports = main;
