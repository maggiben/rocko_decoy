import { Request, Response } from 'express';
import { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID } from "../constants";

import express from 'express';
const router = express.Router();
import axios from 'axios';

router.get('/follower-count', async (req: Request, res: Response) => {
    const apiKey = MAILCHIMP_API_KEY;
    const list_id = MAILCHIMP_LIST_ID; 

    if (!apiKey || !list_id) {
        return res.status(401).json({
            success: false,
            message: 'Missing Mailchimp creds'
        });
    }

    try {
        const headers = {
            'Authorization': `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}`,
            'Content-Type': 'application/json'
        };

        // Make a request to the Mailchimp API to fetch the total email count
        const response = await axios.get(
            `https://us11.api.mailchimp.com/3.0/lists/${list_id}/members`, { 
                headers: headers 
            });

        // Extract count from the response
        const total_count = response.data.total_items;

        return res.json({
            success: true,
            email: total_count,
        });
    } catch (error) {
        console.error('Error fetching count from Mailchimp:', error, {statz: res.status});
        // @ts-ignore
        return res.status(error.response.status).json({
            success: false,
            message: 'Failed to fetch count from Mailchimp'
        });
    }
});

export default router;
