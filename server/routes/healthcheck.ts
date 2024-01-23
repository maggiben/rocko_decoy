import express from 'express';
const router = express.Router();
// @ts-ignore
router.get('/healthcheck', (req, res) => {
    res.send('OK');
});

export default router;
