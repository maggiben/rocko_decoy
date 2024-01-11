const express = require('express');
const router = express.Router();

// Import the specific routers
const coinbaseRouter = require('./coinbase');
const healthcheckRouter = require('./healthcheck');
const loanRouter = require('./loan');
const assetRouter = require('./asset');
const alertRouter = require('./alert');
const userRouter = require('./user');
const marketingRouter = require('./marketing');

router.use('/', coinbaseRouter);
router.use('/', healthcheckRouter);
router.use('/', loanRouter);
router.use('/', assetRouter);
router.use('/', alertRouter);
router.use('/', userRouter);
router.use('/marketing', marketingRouter);

module.exports = router;
