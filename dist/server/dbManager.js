'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildDatabase = buildDatabase;
exports.getFavoriteTrips = getFavoriteTrips;
exports.saveFavoriteTrip = saveFavoriteTrip;
exports.deleteFavoriteTrip = deleteFavoriteTrip;
exports.getFavoriteLines = getFavoriteLines;
exports.saveFavoriteLine = saveFavoriteLine;
exports.deleteFavoriteLine = deleteFavoriteLine;

var _sqlite = require('sqlite3');

var _sqlite2 = _interopRequireDefault(_sqlite);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var database = new _sqlite2.default.Database(_path2.default.join(__dirname, '..', '..', 'database', 'sample.db'));

function buildDatabase() {
    console.log("database stuff here");
    var CREATE_TRIPS = "CREATE TABLE IF NOT EXISTS favorite_trips (id, PRIMARY KEY (id));";
    var CREATE_LINES = "CREATE TABLE IF NOT EXISTS favorite_lines (id, PRIMARY KEY (id));";
    database.run(CREATE_TRIPS);
    database.run(CREATE_LINES);
}

function getFavoriteTrips(callback) {
    var stmt = database.prepare("SELECT id FROM favorite_trips");
    stmt.all(function (err, rows) {
        callback(err, rows);
    });
}

function saveFavoriteTrip(tripId, callback) {
    var stmt = database.prepare("INSERT OR REPLACE INTO favorite_trips VALUES(?)", tripId);
    stmt.run(function (err, rows) {
        callback(err, rows);
    });
}

function deleteFavoriteTrip(tripId, callback) {
    var stmt = database.prepare("DELETE FROM favorite_trips WHERE id=(?)", tripId);
    stmt.run(function (err, rows) {
        callback(err, rows);
    });
}

function getFavoriteLines(callback) {
    var stmt = database.prepare("SELECT id FROM favorite_lines");
    stmt.all(function (err, rows) {
        callback(err, rows);
    });
}

function saveFavoriteLine(lineName, callback) {
    var stmt = database.prepare("INSERT OR REPLACE INTO favorite_lines VALUES(?)", lineName);
    stmt.run(function (err, rows) {
        callback(err, rows);
    });
}

function deleteFavoriteLine(lineName, callback) {
    var stmt = database.prepare("DELETE FROM favorite_lines WHERE id=(?)", lineName);
    stmt.run(function (err, rows) {
        callback(err, rows);
    });
}