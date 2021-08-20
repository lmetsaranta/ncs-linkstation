const main = require('./main');
const Device = require('./device');
const Linkstation = require('./linkstation');

test('Correct printing when linkstation is reachable', () => {
  const device = new Device(0, 0);
  const linkstation = new Linkstation(0, 0, 10);
  const linkstations = {};
  linkstations.stationArray = [linkstation];
  expect(main(linkstations, device)).toBe("Best link station for point 0,0 is 0,0 with power 100");
});

test('Correct printing when linkstation is NOT reachable', () => {
  const device = new Device(0, 0);
  const linkstation = new Linkstation(10, 0, 9);
  const linkstations = {};
  linkstations.stationArray = [linkstation];
  expect(main(linkstations, device)).toBe("No link station within reach for point 0,0");
});

test('Linkstation is NOT reachable when device distance === reach', () => {
  const device = new Device(0, 0);
  const linkstation = new Linkstation(10, 0, 10);
  const linkstations = {};
  linkstations.stationArray = [linkstation];
  expect(main(linkstations, device)).toBe("No link station within reach for point 0,0");
});

test('Best linkstation is chosen when multiple stations within reach', () => {
  const device = new Device(0, 0);
  const linkstation1 = new Linkstation(0, 1, 4);
  const linkstation2 = new Linkstation(0, 2, 4);
  const linkstations = {};
  linkstations.stationArray = [linkstation1, linkstation2];
  expect(main(linkstations, device)).toBe("Best link station for point 0,0 is 0,1 with power 9");
});

test('Negative coordinate values are calculated correctly', () => {
  const device = new Device(-2, -2);
  const linkstation = new Linkstation(-2, 0, 6);
  const linkstations = {};
  linkstations.stationArray = [linkstation];
  expect(main(linkstations, device)).toBe("Best link station for point -2,-2 is -2,0 with power 16");
});

test('Show power value with only two decimals', () => {
  const device = new Device(18, 18);
  const linkstation = new Linkstation(20, 20, 5);
  const linkstations = {};
  linkstations.stationArray = [linkstation];
  expect(main(linkstations, device)).toBe("Best link station for point 18,18 is 20,20 with power 4.72");
});
