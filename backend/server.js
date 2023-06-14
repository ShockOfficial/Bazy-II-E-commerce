require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const productsRoutes = require('./routes/products');
const packagesRoutes = require('./routes/packages');
const cors = require('cors');

// initialize express app
const app = express();
app.use(express.json());

// middleware just to see what requests have been made
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use('/users', cors(), userRoutes);

app.use('/products', productsRoutes);

app.use('/packages', packagesRoutes);

// make a connection with db
mongoose
	.connect(process.env.MONG_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log(`Listening on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
