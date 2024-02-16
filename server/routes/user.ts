import { BLACKLIST_COUNTRY_CODES, VPNAPI_KEY } from "../constants";

import express from 'express';
const router = express.Router();
import { db } from '../db';
import axios from 'axios';
import checkJwt from "../auth/checkJwt";

router.post(
    '/addUser', (req, res, next) => {
      let data = {
        email: req.body.email,
        wallet_address: req.body.wallet_address,
        inactive: req.body.active,
        create_time: new Date(),
        modified_time: new Date(),
      };
      let sql = `SELECT * FROM users WHERE email = ?`;
      // @ts-ignore
      const params = [req.body.email];
      // @ts-ignore
      db.query(sql, params, (err, results) => {
          if (err) {
            console.error(err);
            return next(new Error('Database query failed'));
          }

          if (results.length > 0) {
            return res.status(403).send('Cannot create user');
          } else {
            let sql = "INSERT INTO users SET ?";
            // @ts-ignore
            db.query(sql, data, (err, results) => {
              if (err) {
                console.error(err);
                return next(new Error('Database query failed'));
              }
              return res.send("Data successfully saved in users table!");
            });
          }
      })
    }
);
  
router.post(
  '/updateUser', checkJwt, (req, res, next) => {
    if (req.user && req.user.email === req.body.email) {
      let data = {
        email: req.user.email,
        phone: req.body.phone,
        modified_time: new Date(),
      };
      let sql = "UPDATE users SET phone = ?, modified_time = ? WHERE email = ?";
  
      db.query(sql, [data.phone, data.modified_time, data.email], (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        return res.send("User's Phone data successfully updated");
      });
    } else {
      return res.status(401).send('Unauthorized: Invalid email');
    }
  }
);

// Get all users

router.post('/users', checkJwt, (req, res, next) => {
  if (req.user && req.user.email === req.body.email) {
    let sql = `SELECT * FROM users WHERE email = ?`;
    const params = [req.user.email];
    db.query(sql, params, (err, results) => {
        if (err) {
          console.error(err);
          return next(new Error('Database query failed'));
        }
        return res.status(200).json(results);
    })
  } else {
    return res.status(401).send('Unauthorized: Invalid email');
  }
})

// Get user id

router.post('/userid', checkJwt, (req, res, next) => {
    if (req.user && req.user.email === req.body.email) {
      let sql = `SELECT id FROM users WHERE email = ?`;
      const params = [req.user.email];
      db.query(sql, params, (err, results) => {
          if (err) {
            console.error(err);
            return next(new Error('Database query failed'));
          }
          return res.status(200).json(results);
      })
  } else {
    return res.status(401).send('Unauthorized: Invalid email');
  }
})

// TODO move to compliance router
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
       return res.status(200).send('No VPN, Proxy, Tor, or Relay detected');
      } else {
        return res.status(403).send('VPN, Proxy, Tor, or Relay detected');
      }
    }
  } catch (error) {
    return res.status(403).send('Failed region/vpn test');
  }
})

export default router;
