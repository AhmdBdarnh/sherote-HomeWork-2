require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const rout = require('./router/allRouters');
const { connectDB } = require('./db/dbconnect');
const logging = require('./middlewarre-logger/logger');

// constans
const app = express();
const port = process.env.PORT || 3000;

module.exports = app;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // or combined..
  app.use((req, res, next) => {
    logging.info(`${req.method} ${req.url} ${res.statusCode}`);
    next();
  });
}

// Routes
app.use(rout);

// connect to db
connectDB();

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
