import { BLACKLIST_COUNTRY_CODES, VPNAPI_KEY } from "../constants";

import express from 'express';
const router = express.Router();
// @ts-ignore
import { db } from '../db';
import axios from 'axios';

router.post(
    '/addUser', (req, res, next) => {
      let data = {
        auth0_id: req.body.auth0_id,
        email: req.body.email,
        wallet_address: req.body.wallet_address,
        inactive: req.body.active,
        create_time: new Date(),
        modified_time: new Date(),
      };
      let sql = "INSERT INTO users SET ?";
      // @ts-ignore
      db.query(sql, data, (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        res.send("Data successfully saved in users table!");
      });
    }
);
  
router.post(
  '/updateUser', (req, res, next) => {
    let data = {
      email: req.body.email,
      phone: req.body.phone,
      modified_time: new Date(),
    };
    let sql = "UPDATE users SET phone = ?, modified_time = ? WHERE email = ?";

    db.query(sql, [data.phone, data.modified_time, data.email], (err, results) => {
      if (err) {
        console.error(err);
        return next(new Error('Database query failed'));
      }
      res.send("User's Phone data successfully updated");
    });
  }
);

// Get all users

router.post('/users', (req, res, next) => {
    let sql = `SELECT * FROM users WHERE email = ?`;
    const params = [req.body.email];
    // @ts-ignore
    db.query(sql, params, (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        res.status(200).json(results);
    })
})

// Get user id

router.post('/userid', (req, res, next) => {
    let sql = `SELECT id FROM users WHERE email = ?`;
    const params = [req.body.email];
    // @ts-ignore
    db.query(sql, params, (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        res.status(200).json(results);
    })
})

// Get User IP
const VPNAPI_URL = 'https://vpnapi.io/api';
const blacklist_country_code = BLACKLIST_COUNTRY_CODES;

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

export default router;
