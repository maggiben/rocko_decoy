import express from 'express';
const router = express.Router();
// @ts-ignore
import { db } from '../db';
import checkJwt from '../auth/checkJwt';

// TODO check that user owns the alert before any actions below
// TODO add user_id to the alerts table

/////////////////// Get Alerts
// @ts-ignore
router.get('/alerts', checkJwt, (req, res, next) => {
    let sql = `SELECT * FROM alerts WHERE loan_id = ?`;
    let params = [req.query.loanId];
    // @ts-ignore
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      res.status(200).json(results);
    })
})


////////////////////  Create a new alert

router.post(
  // @ts-ignore
  '/addAlert',  checkJwt, (req, res, next) => {
    let data = {
      loan_id: req.body.loan_id, 
      alert_type: req.body.alert_type,
      alert_metric: req.body.alert_metric,
      alert_threshold: req.body.alert_threshold,
      alert_email: req.body.alert_email,
      alert_phone: req.body.alert_phone,
      alert_repeat_secs: req.body.alert_repeat_secs,
      alert_once:req.body.alert_once,
      active: req.body.active,        
      create_time: new Date(),
      modified_time: new Date(),
    };

    let sql = "INSERT INTO alerts SET ?";
    // @ts-ignore
    db.query(sql, data, (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        res.send("Alert successfully saved");
    });
  }
);

//////////////////// Update alert

router.post("/updateAlert", checkJwt, (req, res, next) => {
  console.log(req.body)
    let data = {
        id: req.body.id, 
        alert_metric: req.body.alert_metric,
        alert_threshold: req.body.alert_threshold,
        alert_email: req.body.alert_email,
        alert_phone: req.body.alert_phone,
        alert_repeat_secs: req.body.alert_repeat_secs,
        alert_once:req.body.alert_once,
        active: req.body.active,        
        modified_time: new Date(),
    };

    let sql = "UPDATE alerts SET alert_metric = ?, alert_threshold = ?, alert_email = ?, alert_phone = ?, alert_repeat_secs = ?, alert_once = ?, active = ?, modified_time = ? WHERE id = ?";

    db.query(
      sql, 
      [data.alert_metric, data.alert_threshold, data.alert_email, data.alert_phone, data.alert_repeat_secs, data.alert_once, data.active, data.modified_time, data.id], 
      // @ts-ignore
      (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        res.send("Alert successfully updated");
    });
});

router.post("/deleteAlert", checkJwt, (req, res, next) => {
  let data = {
    id: req.body.id, 
    active: req.body.active,        
    modified_time: new Date(),
  };

  let sql = "UPDATE alerts SET active = ?, modified_time = ? WHERE id = ?";
  // @ts-ignore
  db.query(sql, [data.active, data.modified_time, data.id], (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      res.send("Alert successfully removed");
  });
})

router.post("/deleteAlertByType", checkJwt, (req, res, next) => {
  let data = {
    alertType : req.body.alertType,   
    active: 0,     
    modified_time: new Date(),
  };

  let sql = "UPDATE alerts SET active = ?, modified_time = ? WHERE alert_type = ?";
  // @ts-ignore
  db.query(sql, [data.active, data.modified_time, data.alertType], (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      res.send("Alerts successfully removed");
  });
})


export default router;
