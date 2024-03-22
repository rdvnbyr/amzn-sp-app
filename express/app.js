const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const connect_mongodb_datasource = require('./datasources/mongodb');
const { getPath } = require('./services/path');
require('colors');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'app.log'), {
  flags: 'a',
});

// Load env vars
dotenv.config();

// Connect to MongoDB
connect_mongodb_datasource();

// create express app
const app = express();

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(morgan('combined', { stream: accessLogStream }));

// routes
app.use('/api/ping', require('./routes/ping'));
app.use('/api/listings', require('./routes/listing'));

// set the view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render(getPath('public/index'), { title: 'Amazon SP' });
});

const port = process.env.PORT;
app.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server running on ` + `http://localhost:${port}`.magenta);
  }
});
