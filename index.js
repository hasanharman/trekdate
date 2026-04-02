/**
 * Converts a JS Date to a TNG-era stardate.
 * Based on the idea that year 2323 = stardate 0,
 * and each year adds 1000 stardate units.
 *
 * @param {Date} [date] - Date to convert (defaults to now)
 * @returns {string} Stardate string (e.g. "76145.2")
 */
function toStardate(date = new Date()) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new TypeError("Invalid date provided");
  }

  const year = date.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  const fraction = (date - start) / (end - start);
  const stardate = (year - 2323) * 1000 + fraction * 1000;

  return stardate.toFixed(1);
}

/**
 * Converts a stardate back to a JS Date.
 *
 * @param {number} stardate - The stardate number
 * @returns {Date}
 */
function fromStardate(stardate) {
  if (typeof stardate !== "number" || isNaN(stardate)) {
    throw new TypeError("Invalid stardate provided");
  }

  const year = Math.floor(stardate / 1000) + 2323;
  const fraction = (stardate % 1000) / 1000;

  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  return new Date(start.getTime() + fraction * (end - start));
}

module.exports = { toStardate, fromStardate };
