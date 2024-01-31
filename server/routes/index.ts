import express from 'express';
const router = express.Router();

// Import the specific routers
import coinbaseRouter from './coinbase';
import healthcheckRouter from './healthcheck';
import loanRouter from './loan';
import assetRouter from './asset';
import alertRouter from './alert';
import userRouter from './user';
import marketingRouter from './marketing';

router.use('/', coinbaseRouter);
router.use('/', healthcheckRouter);
router.use('/', loanRouter);
router.use('/', assetRouter);
router.use('/', alertRouter);
router.use('/', userRouter);
router.use('/marketing', marketingRouter);

module.exports = router;
