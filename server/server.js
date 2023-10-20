const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const {connectDB, db} = require('./db');
const cors = require("cors");
const router = require('./routes');
const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

// Set up CORS
const corsOptions = {
  origin: CLIENT_URL,
  credentials: true
};

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Connect Database
connectDB();

/////////////// Define Routes
app.use('/', router);

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
