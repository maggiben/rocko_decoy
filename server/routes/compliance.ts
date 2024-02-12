import { Request, Response } from 'express';

import express from 'express';
import isOFACCompliant from '../util/ofac-crypto';
import complianceCheckAddress from '../util/complianceCheckAddress';
import complianceTransaction from '../util/complianceTransaction';
import { db } from '../db';
const router = express.Router();

router.post('/address', async (req: Request, res: Response, next) => {
    // address check
    if(req.body.address){
        const isOFACCompliantResult = await isOFACCompliant(req.body.address);
        const complianceCheckAddressResult = await complianceCheckAddress(req.body.address);


        const addressCompQuery = "INSERT INTO compliance_address (wallet_address, user_id, user_email, is_ofac_compliant, create_time) VALUES (?, ?, ?, ?, ?)";
        const addressParams = [req.body.address, req?.user?.id, req?.user?.email, isOFACCompliantResult, new Date()];

        db.query(addressCompQuery, addressParams, (err, results) => {
            if (err) {
                console.error(err);
                return next(new Error('Failed to insert into compliance_address'));
            }

            console.log("compliance_address updated successfully");
        });

        if ( 
            isOFACCompliantResult && complianceCheckAddressResult
        ) {
            return res.status(200).send('OK');
        } else {            
            // block user
            let sql = "UPDATE users SET inactive = ?, modified_time = ? WHERE email = ?";
            const params = [1, new Date(), req?.user?.email];
            db.query(sql, params, (err: any, results: any) => {
                if (err) {
                  console.error(err);
                  return next(new Error('Database query failed'));
                }
                return res.status(401).send('Unauthorized');
              });

            return res.status(400).send('Bad Request');
        }
        
    } else {
        return res.status(400).send('Bad Request: Missing address');
    }
});

router.post('/transaction', async (req: Request, res: Response, next) => {
    // transaction check
     // send transaction to TRM for monitoring
    const transactionMonitoring = await complianceTransaction(req.body.transaction_hash)
   
    const txMonQuery = "INSERT INTO compliance_transaction (transaction_hash, destination_address, user_id, user_email, create_time) VALUES (?, ?, ?, ?, ?)";
    const txParams = [req.body.transaction_hash, req.body.destination_address, req?.user?.id, req?.user?.email, new Date()];

    db.query(txMonQuery, txParams, (err, results) => {
        if (err) {
            console.error(err);
            return next(new Error('Failed to insert into compliance_transaction'));
        }

        console.log("compliance_transaction updated successfully");
    });

    if(transactionMonitoring){
        return res.send('OK');
    } else {
        return res.status(400).send('Bad Request: Missing tx hash');
    }
});

export default router;
