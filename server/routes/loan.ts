import express from 'express';
import { Response, NextFunction } from 'express';
const router = express.Router();
import { db } from '../db';
import checkJwt from '../auth/checkJwt';

/////////////////// Get loans
router.get('/loans', checkJwt, (req, res, next) => {
  if (req.user && req.user.id === req.query.user) {
    let sql = `SELECT * FROM loans WHERE user_id = ?`;
    const params = [req.user.id];
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      return res.status(200).json(results);
    })
  } else {
    return res.status(401).send('Unauthorized: Invalid ID');
  }
})


////////////////////  Create a new loan

const loanKillSwitch = (res: Response, next: NextFunction) => {
  let killSwitch = "SELECT loan_booking_blocked, transactions_blocked FROM kill_switch";

  db.query(killSwitch, {}, (err, results) => {
    if (err) {
      console.error(err);
      return next(new Error('Database query failed'));
    }
    if (!!results[0].loan_booking_blocked || !!results[0].transactions_blocked) {
      return res.status(503).send('New loans are currently disabled');
    }
  });
}

router.post(
  '/add', checkJwt, (req, res, next) => {
    if (req.user && req.user.id === req.body.user) {

      loanKillSwitch(res, next);

      let data = {
        user_id: req.user.id,
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
          if (err) {
            console.error(err);
            return next(new Error('Database query failed'));
          }
          return res.send("Data successfully saved");
        });
      } else { // update loan (add borrowing and collateral)
        let sql = "UPDATE loans SET transaction_hash = ?, outstanding_balance = ?, collateral = ?, modified_time = ? WHERE user_id = ?";

        db.query(
          sql, 
          [data.transaction_hash, data.outstanding_balance, data.collateral, data.modified_time, data.user_id], 
          (err, results) => {
          if (err) {
            console.error(err);
            return next(new Error('Database query failed'));
          }
          return res.send("Deposit Loan Status successfully updated");
        });
      }
    } else {
      return res.status(401).send('Unauthorized: Invalid ID');
    }
  }
);

//////////////////// Update loan

router.post("/update", checkJwt, (req, res, next) => {
  if (req?.user?.id) {
    const updateType = req.body.updateType;

    if (updateType === "repay") {
      let data = {
        user_id: req.user.id,
        id: req.body.id,
        outstanding_balance: req.body.outstanding_balance,
        interest: req.body.interest,
        loan_active: req.body.loan_active,
        transaction_hash: req.body.transaction_hash,
        modified_time: new Date()
      };
      let sql = "UPDATE loans SET outstanding_balance = ?, interest = ?, loan_active = ?, transaction_hash = ?, modified_time = ? WHERE id = ? AND user_id = ?";

      db.query(
        sql, 
        [data.outstanding_balance, data.interest, data.loan_active, data.transaction_hash, data.modified_time, data.id, data.user_id], 
        (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        return res.send("Amount and Active Status successfully updated");
      });
    } else {
      let data = {
        user_id: req.user.id,
        id: req.body.id,
        collateral: req.body.collateral,
        transaction_hash: req.body.transaction_hash,
        modified_time: new Date()
      };
      let sql = "UPDATE loans SET collateral = ?, transaction_hash = ?, modified_time = ? WHERE id = ? AND user_id = ?";

      db.query(
        sql, 
        [data.collateral, data.transaction_hash, data.modified_time, data.id, data.user_id],
        (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        return res.send("Buffer, Collateral and LiquidationPrice successfully updated");
      });
    }
  } else {
    return res.status(401).send('Unauthorized: Invalid ID');
  }
});

export default router;
