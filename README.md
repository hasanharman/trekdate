# stardate-converter 🖖

Convert JavaScript dates to Star Trek stardates and back.

## Install

npm install stardate-converter

## Usage

const { toStardate, fromStardate } = require('stardate-converter');

toStardate(new Date());        // "-296854.9"
toStardate(new Date(2380, 0, 1)); // "57000.0"

fromStardate(57000);           // 2380-01-01T00:00:00.000Z
