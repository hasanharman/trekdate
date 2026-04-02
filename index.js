/**
 * TNG-era Stardate Reference Year.
 * Per the Star Trek Chronology, January 1, 2323 = Stardate 0.
 * Stardates progress at 1000 units per year.
 */
const STARDATE_EPOCH = 2323;

/**
 * Converts a JS Date to a TNG-era stardate.
 * Based on the Star Trek Chronology system used in
 * The Next Generation, Deep Space Nine, Voyager, and Picard.
 *
 * Year 2323 = Stardate 0, with 1000 units per year.
 * The decimal digit represents a fractional day (0.1 = 2.4 hours).
 *
 * @param {Date} [date] - Date to convert (defaults to now)
 * @returns {string} Stardate string (e.g. "41153.7")
 */
function toStardate(date = new Date()) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new TypeError("Invalid date provided");
  }

  const year = date.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  const fraction = (date - start) / (end - start);
  const stardate = (year - STARDATE_EPOCH) * 1000 + fraction * 1000;

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

  const year = Math.floor(stardate / 1000) + STARDATE_EPOCH;
  const fraction = (stardate % 1000) / 1000;

  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);

  return new Date(start.getTime() + fraction * (end - start));
}

/**
 * Returns a formatted TNG-style stardate string.
 * Example: "Stardate 41153.7"
 *
 * @param {Date} [date] - Date to convert (defaults to now)
 * @returns {string}
 */
function formatStardate(date = new Date()) {
  return "Stardate " + toStardate(date);
}

/**
 * Returns a Captain's Log entry in the style of Jean-Luc Picard.
 * Example: "Captain's log, stardate 41153.7. We have arrived at Deneb IV."
 *
 * @param {Date} [date] - Date to use (defaults to now)
 * @param {string} [message] - Optional log message to append
 * @returns {string}
 */
function captainsLog(date = new Date(), message) {
  const entry = "Captain's log, stardate " + toStardate(date) + ".";
  if (message) {
    return entry + " " + message;
  }
  return entry;
}

module.exports = { toStardate, fromStardate, formatStardate, captainsLog };
