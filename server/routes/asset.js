const express = require('express');
const router = express.Router();
const {db} = require('../db')

/////////////////// Get loans

router.get('/average_apr', (req, res) => {
    let sql = `SELECT AVG(borrow_apr) AS average_apr FROM asset_data WHERE fetch_time >= '${req.query.openDate}'`;

    // let sql = `SELECT * FROM loans WHERE user = '${req.query.user}'`;
    db.query(sql, (err, results) => {
      if (err) throw err;
      res.status(200).json(results);
    })
})


module.exports = router;