const express = require('express');
const router = express.Router();
const {db} = require('../db')
const IP = require('ip');

/////////////////// Get loans

router.get('/loans', (req, res) => {
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
      create_time: new Date(),
      modified_time: new Date(),
    };

    if (!req.body.exist) { // if new loan on current user
      let sql = "INSERT INTO loans SET ?";
      db.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send("Data successfully saved");
      });
    } else { // update loan (add borrowing and collateral)
      let sql = "UPDATE loans SET transaction_hash = ?, outstanding_balance = ?, collateral = ?, modified_time = ? WHERE user = ?";

      db.query(sql, [data.transaction_hash, data.outstanding_balance, data.collateral, data.modified_time, data.user], (err, results) => {
        if (err) throw err;
        res.send("Deposit Loan Status successfully updated");
      });
    }
  }
);

//////////////////// Update loan

router.post("/update", (req, res) => {
  const updateType = req.body.updateType;

  if (updateType === "repay") {
    let data = {
      id: req.body.id,
      outstanding_balance: req.body.outstanding_balance,
      interest: req.body.interest,
      loan_active: req.body.loan_active,
      transaction_hash: req.body.transaction_hash,
      modified_time: new Date()
    };
    let sql = "UPDATE loans SET outstanding_balance = ?, interest = ?, loan_active = ?, transaction_hash = ?, modified_time = ? WHERE id = ?";

    db.query(sql, [data.outstanding_balance, data.interest, data.loan_active, data.transaction_hash, data.modified_time, data.id], (err, results) => {
      if (err) throw err;
      res.send("Amount and Active Status successfully updated");
    });
  } else {
    let data = {
      id: req.body.id,
      collateral: req.body.collateral,
      transaction_hash: req.body.transaction_hash,
      modified_time: new Date()
    };
    let sql = "UPDATE loans SET collateral = ?, transaction_hash = ?, modified_time = ? WHERE id = ?";

    db.query(sql, [data.collateral, data.transaction_hash, data.modified_time, data.id], (err, results) => {
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


// Get User IP

router.get('/ip', (req, res) => {
  const ipAddress = IP.address();
  res.send(ipAddress)
})


module.exports = router;