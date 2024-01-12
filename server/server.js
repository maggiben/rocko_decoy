const express = require("express");
require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const {connectDB, db} = require('./db');
const cors = require("cors");
const router = require('./routes');
const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || CLIENT_URL || /(^https:\/\/)([a-z0-9]+[.])*testnet.rocko.co$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Connect Database
connectDB();

/////////////// Define Routes
app.use('/', router);

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
