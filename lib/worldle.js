const fs = require('fs-extra');
const geolib = require('geolib');

var countries, c1, arrow;
var state = 'IDLE';
var c2 = null;
var arrows = {
  N: "⬆️",
  NNE: "↗️",
  NE: "↗️",
  ENE: "↗️",
  E: "➡️",
  ESE: "↘️",
  SE: "↘️",
  SSE: "↘️",
  S: "⬇️",
  SSW: "↙️",
  SW: "↙️",
  WSW: "↙️",
  W: "⬅️",
  WNW: "↖️",
  NW: "↖️",
  NNW: "↖️",
};

async function main(input) {
    countries = JSON.parse(fs.readFileSync('./lib/data/countries.json'));
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].name.toLowerCase() == input.toLowerCase()) {
            c1 = countries[i];
        };
    };
};
main();

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var p = Math.PI / 180;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a));
};

function showInfo(lat1, long1, lat2, long2) {
    var distance = distanceInKmBetweenEarthCoordinates(lat1, long1, lat2, long2);

    var arrow = arrows[geolib.getCompassDirection(
        { latitude: lat2, longitude: long2 },
        { latitude: lat1, longitude: long1 }
    )];

    var info;
    if (distance == 0) {
        state = 'FOUND';
    } else {
        state = 'NOT_FOUND';
    };

    info = {
        kilometers: distance,
        miles: distance * 0.62137119224,
        nautical_miles: distance * 0.539957,
        meters: distance * 1000,
        arrow: arrow,
        state: state,
    };

    console.log(info);
    
    return info;
};

async function guess(input, cname) {
    await main(input);

    var countryFound = false;
    for (let i = 0; i < countries.length; i++) {
        if (countries[i].name.toLowerCase() == cname.toLowerCase()) {
            countryFound = true;
            c2 = countries[i];
        };
    };
    if (!countryFound) return { state: 'NO_COUNTRY' };
    return showInfo(
        c1.latitude, c1.longitude,
        c2.latitude, c2.longitude
    );
};

module.exports = {
    guess,
};