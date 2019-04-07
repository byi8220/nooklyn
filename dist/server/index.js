'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get('/api/favoriteTrips', function (req, res) {
	res.json({
		message: 'Get Trips Here'
	});
});

app.get('/api/favoriteLines', function (req, res) {
	res.json({
		message: 'Get Lines Here'
	});
});

app.use(_express2.default.static(_path2.default.join(__dirname, '..', '..', 'build'), { index: false }));

app.get('*', function (req, res) {
	res.sendFile(_path2.default.join(__dirname, '..', '..', 'build', 'index.html'));
});

app.listen(8080, function () {
	console.log('Server listening on port 8080');
});