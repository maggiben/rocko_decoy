const express = require('express');
const router = express.Router();
const {db} = require('../db')

/////////////////// Get loans

router.get('/loans', (req, res) => {
    console.log("loan")
    let sql = `SELECT * FROM loans WHERE user = '${req.query.user}'`;
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
      transaction_hash: req.body.transaction_hash,
      lending_protocol: req.body.lending_protocol,
      loan_active: req.body.loan_active,
      loan_asset: req.body.loan_asset,
      principal_balance: req.body.outstanding_balance,
      outstanding_balance: req.body.outstanding_balance,
      collateral: req.body.collateral,
      liquidation_price: req.body.liquidation_price,
      collateral_buffer: req.body.collateral_buffer,
      create_time: new Date(),
      modified_time: new Date(),
    };
    let sql = "INSERT INTO loans SET ?";
    db.query(sql, data, (err, results) => {
      if (err) throw err;
      res.send("Data successfully saved");
    });
  }
);


//////////////////// Update loan

router.post("/update", (req, res) => {
  console.log("update req.body", req.body);
  const updateType = req.body.updateType;

  if (updateType === "repay") {
    let data = {
      id: req.body.id,
      outstanding_balance: req.body.outstanding_balance,
      loan_active: req.body.loan_active,
      modified_time: new Date()
    };
    let sql = "UPDATE loans SET outstanding_balance = ?, loan_active = ? WHERE id = ?";

    db.query(sql, [data.outstanding_balance, data.loan_active, data.id], (err, results) => {
      if (err) throw err;
      res.send("Amount and Active Status successfully updated");
    });
  } else {
    let data = {
      id: req.body.id,
      buffer: req.body.buffer,
      collateral: req.body.collateral,
      liquidation_price: req.body.liquidation_price,
      modified_time: new Date()
    };
    let sql = "UPDATE loans SET collateral_buffer = ?, collateral = ?, liquidation_price = ? WHERE id = ?";

    db.query(sql, [data.buffer, data.collateral, data.liquidation_price, data.id], (err, results) => {
      if (err) throw err;
      res.send("Buffer, Collateral and LiquidationPrice successfully updated");
    });
  }

});
module.exports = router;

  