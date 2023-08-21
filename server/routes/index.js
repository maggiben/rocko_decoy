const express = require('express');
const router = express.Router();

// Import the specific routers
const loanRouter = require('./loan');
const coinbaseRouter = require('./coinbase');
const healthcheckRouter = require('./healthcheck');

router.use('/', coinbaseRouter);
router.use('/', loanRouter);
router.use('/', healthcheckRouter);

module.exports = router;
