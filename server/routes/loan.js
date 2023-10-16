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
    let sql = "UPDATE loans SET outstanding_balance = ?, loan_active = ?, modified_time = ? WHERE id = ?";

    db.query(sql, [data.outstanding_balance, data.loan_active, data.modified_time, data.id], (err, results) => {
      if (err) throw err;
      res.send("Amount and Active Status successfully updated");
    });
  } else {
    let data = {
      id: req.body.id,
      collateral: req.body.collateral,
      modified_time: new Date()
    };
    let sql = "UPDATE loans SET collateral = ?, modified_time = ? WHERE id = ?";

    db.query(sql, [data.collateral, data.modified_time, data.id], (err, results) => {
      if (err) throw err;
      res.send("Buffer, Collateral and LiquidationPrice successfully updated");
    });
  }
});

/* users table */

// Add users in users table

router.post(
  '/addUser', (req, res) => {
    let data = {
      auth0_id: req.body.auth0_id,
      email: req.body.email,
      wallet_address: req.body.wallet_address,
      active: req.body.active,
      create_time: new Date(),
      modified_time: new Date(),
    };
    let sql = "INSERT INTO users SET ?";
    db.query(sql, data, (err, results) => {
      if (err) throw err;
      res.send("Data successfully saved in users table!");
    });
  }
);

// Get all users

router.get('/users', (req, res) => {
  let sql = `SELECT * FROM users WHERE email = '${req.query.email}'`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json(results);
  })
})


module.exports = router;