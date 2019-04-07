import express from 'express';
import path from 'path';
  
  
const app = express();

app.get('/api/favoriteTrips', (req, res) => {
	res.json({
		message: 'Get Trips Here',
	});
});

app.get('/api/favoriteLines', (req, res) => {
	res.json({
		message: 'Get Lines Here',
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