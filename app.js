require('./db/connection');
const express = require('express');
const app = express();
require('dotenv').config();
const displayRoutes = require('express-routemap');
const connectDB = require('./db/connection');
const { connect } = require('./routes/route');
const TaskRoutes = require('./routes/route');
const connectToDB = require('./db/connection');
const not_found = require('./middlewares/not-found');
const port = process.env.Port || 3000;

app.listen(port, async () => {
	try {
		await connectToDB(process.env.mangoDatabase_Url);
		console.log(`I'm listening on ${port}....`);
		displayRoutes(app);
	} catch (error) {
		console.log(`cannot connect to DB....`, error);
	}
});

// const start = async () => {
// 	try {
// 		await connectToDB()
// 	} catch (error) {

// 	}
// }

// middleware;
app.use(express.static('./private'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', TaskRoutes);
app.use(not_found);
app.get('/welcome', (req, res) => {
	res.status(200).send({
		status: true,
		message: 'welcome on board',
	});
});
