import express from 'express';
const router = express.Router();
// @ts-ignore
import { db } from '../db';
import checkJwt from '../auth/checkJwt';

/////////////////// Get loans
// @ts-ignore
router.get('/loans', checkJwt, (req, res, next) => {
    let sql = `SELECT * FROM loans WHERE user_id = ?`;
    const params = [req.query.user];
    // @ts-ignore
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      res.status(200).json(results);
    })
})


////////////////////  Create a new loan

router.post(
  // @ts-ignore
  '/add', checkJwt, (req, res, next) => {
    let data = {
      user_id: req.body.user,
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
      // @ts-ignore
      db.query(sql, data, (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        res.send("Data successfully saved");
      });
    } else { // update loan (add borrowing and collateral)
      let sql = "UPDATE loans SET transaction_hash = ?, outstanding_balance = ?, collateral = ?, modified_time = ? WHERE user_id = ?";

      db.query(
        sql, 
        [data.transaction_hash, data.outstanding_balance, data.collateral, data.modified_time, data.user_id], 
        // @ts-ignore
        (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        res.send("Deposit Loan Status successfully updated");
      });
    }
  }
);

//////////////////// Update loan

router.post("/update", checkJwt, (req, res, next) => {
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

    db.query(
      sql, 
      [data.outstanding_balance, data.interest, data.loan_active, data.transaction_hash, data.modified_time, data.id], 
      // @ts-ignore
      (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
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

    db.query(
      sql, 
      [data.collateral, data.transaction_hash, data.modified_time, data.id], 
      // @ts-ignore
      (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      res.send("Buffer, Collateral and LiquidationPrice successfully updated");
    });
  }
});

export default router;
