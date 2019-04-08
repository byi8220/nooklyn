'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dbManager = require('./dbManager');

var dbManager = _interopRequireWildcard(_dbManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

dbManager.buildDatabase();

var app = (0, _express2.default)();

app.get('/api/favoriteTrips', function (req, res) {
	dbManager.getFavoriteTrips(function (err, rows) {
		console.log(rows);
		res.json(rows);
	});
});

app.post('/api/favoriteTrips/:tripId', function (req, res) {
	var tripId = req.params['tripId'];
	console.log(tripId);
	dbManager.saveFavoriteTrip(tripId, function (err, rows) {
		if (err) {
			console.err(err);
			res.status(500);
		} else {
			res.status(202);
		}
		res.end();
	});
});

app.delete('/api/favoriteTrips/:tripId', function (req, res) {
	var tripId = req.params['tripId'];
	dbManager.deleteFavoriteTrip(tripId, function (err, rows) {
		if (err) {
			console.err(err);
			res.status(500);
		} else {
			res.status(202);
		}
		res.end();
	});
});

app.get('/api/favoriteLines', function (req, res) {
	dbManager.getFavoriteLines(function (err, rows) {
		console.log(rows);
		res.json(rows);
	});
});

app.post('/api/favoriteLines/:lineName', function (req, res) {
	var lineName = req.params['lineName'];
	dbManager.saveFavoriteLine(lineName, function (err, rows) {
		if (err) {
			console.err(err);
			res.status(500);
		} else {
			res.status(202);
		}
		res.end();
	});
});

app.delete('/api/favoriteLines/:lineName', function (req, res) {
	var lineName = req.params['lineName'];
	dbManager.deleteFavoriteLine(lineName, function (err, rows) {
		if (err) {
			console.err(err);
			res.status(500);
		} else {
			res.status(202);
		}
		res.end();
	});
});

app.use(_express2.default.static(_path2.default.join(__dirname, '..', '..', 'build'), { index: false }));

app.get('*', function (req, res) {
	res.sendFile(_path2.default.join(__dirname, '..', '..', 'build', 'index.html'));
});

app.listen(8080, function () {
	console.log('Server listening on port 8080');
});