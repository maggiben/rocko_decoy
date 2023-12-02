const express = require('express');
const router = express.Router();
const {db} = require('../db')
const axios = require('axios');

router.post(
    '/addUser', (req, res) => {
      let data = {
        auth0_id: req.body.auth0_id,
        email: req.body.email,
        wallet_address: req.body.wallet_address,
        inactive: req.body.active,
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

router.post('/users', (req, res) => {
    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    })
})

// Get user id

router.post('/userid', (req, res) => {
    let sql = `SELECT id FROM users WHERE email = '${req.body.email}'`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.status(200).json(results);
    })
})

// Get User IP
const VPNAPI_URL = 'https://vpnapi.io/api';  
const VPNAPI_KEY = process.env.VPNAPI_KEY;
const blacklist_country_code = ['CU', 'IR', 'KP', 'RU', 'SY', 'UA'];

router.post('/vpn', async (req, res) => {
  try {
    const ip = req.body.ip;
    const response = await axios.get(`${VPNAPI_URL}/${ip}?key=${VPNAPI_KEY}`);

    const { security, location } = response.data;

    if (blacklist_country_code.includes(location.country_code)) {
      res.status(403).send('Failed region/vpn test');
    } else {
      if ( security.vpn === false &&
        security.proxy === false &&
        security.tor === false &&
        security.relay === false 
      ) {
        res.status(200).send('No VPN, Proxy, Tor, or Relay detected');
      } else {
        res.status(403).send('VPN, Proxy, Tor, or Relay detected');
      }
    }
  } catch (error) {
    res.status(403).send('Failed region/vpn test');
  }
})


module.exports = router;