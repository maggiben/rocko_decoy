const express = require('express');
const router = express.Router();
const {db} = require('../db')

/////////////////// Get loans

router.get('/loan', (req, res) => {
    console.log("loan")
    let sql = `SELECT * FROM loan WHERE user = '${req.query.user}'`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    })
})


////////////////////  Create a new loan

router.post(
  '/add', (req, res) => {
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
  }
);


//////////////////// Update loan

router.post("/update", (req, res) => {
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
module.exports = router;

  