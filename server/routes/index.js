const express = require('express');
const router = express.Router();

// Import the specific routers
const loanRouter = require('./loan');
const coinbaseRouter = require('./coinbase');

router.use('/', coinbaseRouter);
router.use('/', loanRouter);

module.exports = router;
