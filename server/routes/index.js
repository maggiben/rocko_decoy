const express = require('express');
const router = express.Router();

// Import the specific routers
const coinbaseRouter = require('./coinbase');
const healthcheckRouter = require('./healthcheck');
const loanRouter = require('./loan');
const assetRouter = require('./asset');

router.use('/', coinbaseRouter);
router.use('/', healthcheckRouter);
router.use('/', loanRouter);
router.use('/', assetRouter);

module.exports = router;
