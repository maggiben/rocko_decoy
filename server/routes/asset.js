const express = require('express');
const router = express.Router();
const {db} = require('../db');

/////////////////// Get loans

router.get('/average_apr', (req, res, next) => {
  let sql;
    if (req.query.openDate === "month") {
      sql = `SELECT AVG(borrow_apr) AS average_apr FROM asset_data WHERE fetch_time >= DATE_SUB(NOW(), INTERVAL 30 DAY)`;
    } else if (req.query.openDate === "year") {
      sql = `SELECT AVG(borrow_apr) AS average_apr FROM asset_data WHERE fetch_time >= DATE_SUB(NOW(), INTERVAL 1 YEAR)`;
    } else {
      sql = `SELECT AVG(borrow_apr) AS average_apr FROM asset_data WHERE fetch_time >= '${req.query.openDate}'`;
    }

    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      res.status(200).json(results);
    })
})

router.get('/average_reward_rate', (req, res, next) => {
  let sql = `SELECT AVG(borrow_reward_rate) AS average_reward_rate FROM asset_data WHERE fetch_time >= DATE_SUB(NOW(), INTERVAL 1 YEAR)`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return next(new Error('Database query failed'));
    }
    res.status(200).json(results);
  })
})

router.get('/reward_rate', (req, res, next) => {
  let sql = `SELECT borrow_reward_rate FROM asset_data ORDER BY fetch_time DESC LIMIT 1`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return next(new Error('Database query failed'));
    }
    res.status(200).json(results);
  })
})


module.exports = router;