require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');

// initialize express app
const app = express();
app.use(express.json());

// middleware just to see what requests have been made
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})