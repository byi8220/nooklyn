import express from 'express';
import path from 'path';
import * as dbManager from './dbManager';

dbManager.buildDatabase();
  
const app = express();

app.get('/api/favoriteTrips', (req, res) => {
	dbManager.getFavoriteTrips( function(err, rows) {
		console.log(rows);
		res.json(rows);
	});
});

app.post('/api/favoriteTrips/:tripId', (req,res) => {
	let tripId = req.params['tripId'];
	console.log(tripId);
	dbManager.saveFavoriteTrip(tripId, function(err, rows) {
		if(err){
			console.err(err);
			res.status(500);
		}else{
			res.status(202);
		}
		res.end();
	});
});

app.delete('/api/favoriteTrips/:tripId', (req,res) => {
	let tripId = req.params['tripId'];
	dbManager.deleteFavoriteTrip(tripId, function(err, rows) {
		if(err){
			console.err(err);
			res.status(500);
		}else{
			res.status(202);
		}
		res.end();
	});
});

app.get('/api/favoriteLines', (req, res) => {
	dbManager.getFavoriteLines( function(err, rows) {
		console.log(rows);
		res.json(rows);
	});
});

app.post('/api/favoriteLines/:lineName', (req,res) => {
	let lineName = req.params['lineName'];
	dbManager.saveFavoriteLine(lineName, function(err, rows) {
		if(err){
			console.err(err);
			res.status(500);
		}else{
			res.status(202);
		}
		res.end();
	});
});

app.delete('/api/favoriteLines/:lineName', (req,res) => {
	let lineName = req.params['lineName'];
	dbManager.deleteFavoriteLine(lineName, function(err, rows) {
		if(err){
			console.err(err);
			res.status(500);
		}else{
			res.status(202);
		}
		res.end();
	});
});

app.use(express.static(
	path.join(__dirname, '..', '..', 'build'),
	{ index : false }
));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

app.listen(8080, () => {
	console.log(`Server listening on port 8080`);
});