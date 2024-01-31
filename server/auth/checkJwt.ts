import { Request, Response, NextFunction } from 'express';
import * as jose from "jose"
import { db } from '../db';

const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization || '';

  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
        // Get the JWK set used to sign the JWT issued by Web3Auth
        const jwks = jose.createRemoteJWKSet(new URL("https://api-auth.web3auth.io/jwks"));
        // Verify token is valid and signed by Web3Auth
        const { payload } = await jose.jwtVerify(token, jwks, { algorithms: ["ES256"] });
        let sql = `SELECT id FROM users WHERE email = ?`;
        // @ts-ignore
        const params = [payload.email];
        db.query(sql, params, (err: any, results: any) => {
            if (err) {
              console.error(err);
              res.status(404).send('User not found');
            }
            console.log({results, id: results[0].id})
            // @ts-ignore
            req.user = {
                id: results[0].id,
                email: payload.email
            };

            next(); // Proceed to the next middleware/route handler
        })


    } catch (error) {
        // Token verification failed
        console.log({error})
        res.status(401).send('Unauthorized: Invalid token');
    }

  } else {
    // If the Authorization header is missing or doesn't have a Bearer token, return a 401 Unauthorized response
    res.status(401).send('Unauthorized');
  }
};

export default checkJwt;
