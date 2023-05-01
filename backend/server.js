require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const uploadRoutes = require('./routes/upload');
const productsRoutes = require('./routes/products');

// initialize express app
const app = express();
app.use(express.json());

// middleware just to see what requests have been made
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// routes
app.use('/users', userRoutes);

app.use('/products', productsRoutes);

app.use('/upload', uploadRoutes);

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
