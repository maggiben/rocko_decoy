const express = require("express");
const bodyParser = require("body-parser");
const {connectDB, db} = require('./db');
const cors = require("cors");
const router = require('./routes');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect Database
connectDB();

/////////////// Define Routes
app.use('/', router);

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
