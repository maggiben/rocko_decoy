const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "rocko-db01.ckac6ijfvxlv.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "4SQ4LI0ZZZqp3oMaoYmV",
  database: "loan",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

/////////////// create a loan

app.post("/add", (req, res) => {
  let data = {
    user: req.body.user,
    loan: req.body.loan,
    apr: req.body.apr,
    collateralNeeded: req.body.collateralNeeded,
    collateralUSD: req.body.collateralUSD,
    buffer: req.body.buffer,
    active: true,
    time: new Date(),
  };
  let sql = "INSERT INTO loan SET ?";
  db.query(sql, data, (err, results) => {
    if (err) throw err;
    res.send("Data successfully saved");
  });
});

/////////////////// get loans

app.get("/loan", (req, res) => {
  let sql = `SELECT * FROM loan WHERE user = '${req.query.user}'`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  });
});

//////////////////// update loan

app.post("/updateLoan", (req, res) => {
  console.log("update req.body", req.body);
  let data = {
    amount: req.body.amount,
    active: req.body.active,
    id: req.body.id,
  };
  let sql = "UPDATE loan SET loan = ?, active = ? WHERE id = ?";
  db.query(sql, [data.amount, data.active, data.id], (err, results) => {
    if (err) throw err;
    res.send("Amount and Active Status successfully updated");
  });
});

//////////////////// update collateral

app.post("/updateCollateral", (req, res) => {
  console.log("update req.body", req.body);
  let data = {
    collateral: req.body.collateral,
    active: req.body.active,
    id: req.body.id,
  };
  let sql = "UPDATE loan SET collateralNeeded = ?, active = ? WHERE id = ?";
  db.query(sql, [data.collateral, data.active, data.id], (err, results) => {
    if (err) throw err;
    res.send("Amount and Active Status successfully updated");
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
