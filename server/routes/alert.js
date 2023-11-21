const express = require('express');
const router = express.Router();
const {db} = require('../db')
const axios = require('axios');

/////////////////// Get Alerts

router.get('/alerts', (req, res) => {
    let sql = `SELECT * FROM alerts WHERE loan_id = '${req.query.loanId}'`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    })
})


////////////////////  Create a new alert

router.post(
  '/addAlert', (req, res) => {
    let data = {
      loan_id: req.body.loan_id, 
      alert_type: req.body.alert_type,
      alert_metric: req.body.alert_metric,
      alert_threshold: req.body.alert_threshold,
      alert_email: req.body.alert_email,
      alert_phone: req.body.alert_phone,
      alert_repeat_secs: req.body.alert_repeat_secs,
      active: req.body.active,        
      create_time: new Date(),
      modified_time: new Date(),
    };

    let sql = "INSERT INTO alerts SET ?";
    db.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send("Alert successfully saved");
    });
  }
);

//////////////////// Update alert

router.post("/updateAlert", (req, res) => {
    let data = {
        id: req.body.id, 
        alert_metric: req.body.alert_metric,
        alert_threshold: req.body.alert_threshold,
        alert_email: req.body.alert_email,
        alert_phone: req.body.alert_phone,
        alert_repeat_secs: req.body.alert_repeat_secs,
        active: req.body.active,        
        modified_time: new Date(),
    };

    let sql = "UPDATE alerts SET alert_metric = ?, alert_threshold = ?, alert_email = ?, alert_phone = ?, alert_repeat_secs = ?, active = ?, modified_time = ? WHERE id = ?";

    db.query(sql, [data.alert_metric, data.alert_threshold, data.alert_email, data.alert_phone, data.alert_repeat_secs, data.active, data.modified_time, data.id], (err, results) => {
        if (err) throw err;
        res.send("Alert successfully updated");
    });
});

router.post("/deleteAlert", (req, res) => {
  let data = {
    id: req.body.id, 
    active: req.body.active,        
    modified_time: new Date(),
  };

  let sql = "UPDATE alerts SET active = ?, modified_time = ? WHERE id = ?";

  db.query(sql, [data.active, data.modified_time, data.id], (err, results) => {
      if (err) throw err;
      res.send("Alert successfully removed");
  });


})

module.exports = router;