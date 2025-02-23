const measurementsLib = require('../../dist/index');
const version = require('../../package.json').version;

test('measurements library defined', () => {
    expect(measurementsLib.featureCollection).toBeDefined();
    expect(measurementsLib.feature).toBeDefined();
    expect(measurementsLib.distanceWeight).toBeDefined();
    expect(measurementsLib.version).toBe(version);
});