// Luvrena ring size converter. MIT licence. https://luvrena.com/pages/ring-size-chart
// Data: ring-sizes.json (US 4 to 12). EU size = inside circumference in mm, rounded.
const SIZES = require('./ring-sizes.json');
const FIELD = { us: 'us', eu: 'eu', diameter: 'diameter_mm', circumference: 'circumference_mm' };

/**
 * Find the closest ring size.
 * @param {number} value  the number you know
 * @param {'us'|'eu'|'diameter'|'circumference'} unit  what that number is
 * @returns {object|null} the matching row, or null if the value is outside US 4 to 12
 */
function convert(value, unit) {
  const key = FIELD[unit];
  if (!key || typeof value !== 'number' || Number.isNaN(value)) throw new Error('convert(value, unit): unit must be us, eu, diameter or circumference');
  const tolerance = { us: 0.5, eu: 1.3, diameter: 0.4, circumference: 1.3 }[unit];
  if (value < SIZES[0][key] - tolerance || value > SIZES[SIZES.length - 1][key] + tolerance) return null;
  return SIZES.reduce((best, row) => (Math.abs(row[key] - value) < Math.abs(best[key] - value) ? row : best));
}

/** Check a chart row: the EU size should equal the rounded inside circumference. */
function checkEu(diameterMm, euSize) {
  return Math.abs(diameterMm * Math.PI - euSize) <= 1;
}

module.exports = { convert, checkEu, SIZES };
